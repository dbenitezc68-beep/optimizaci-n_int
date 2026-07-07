// Smoke test operativo end-to-end contra un servidor en marcha (dev o
// producción, http://localhost:3000). Recorre el ciclo de vida completo por
// HTTP usando la mejora progresiva de Next (valida también el funcionamiento
// sin JavaScript): captación → cualificación → venta → ejecución → cobros →
// mantenimiento → dirección.
//
// Seguro con datos reales: todo lo que crea lleva el prefijo "SMOKE" y se
// elimina al terminar (también al empezar, por si una ejecución anterior
// quedó a medias). Crea y borra su propio usuario.
//
// Uso: npm run smoke   (requiere el servidor levantado)
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const BASE = "http://localhost:3000";
const USER_EMAIL = "smoke@interemprex.local";
const USER_PASS = "smoke-test-12345";
let cookie = "";
let failures = 0;

function check(name: string, ok: boolean, extra = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? " — " + extra : ""}`);
  if (!ok) failures++;
}

async function req(path: string, init: RequestInit = {}): Promise<Response> {
  const r = await fetch(BASE + path, {
    ...init,
    redirect: "manual",
    headers: { ...(init.headers as Record<string, string>), cookie },
  });
  const sc = r.headers.getSetCookie();
  if (sc.length) cookie = sc.map((c) => c.split(";")[0]).join("; ");
  return r;
}

async function follow(r: Response): Promise<Response> {
  let cur = r;
  let n = 0;
  while ([301, 302, 303, 307, 308].includes(cur.status) && n++ < 6) {
    let loc = cur.headers.get("location") ?? "/";
    if (loc.startsWith(BASE)) loc = loc.slice(BASE.length);
    cur = await req(loc);
  }
  return cur;
}

function decode(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

// Campos del <form> cuyo contenido incluye `marker` (hidden con valor, el
// resto vacíos o su opción seleccionada) para reenviarlos con overrides.
function formFields(html: string, marker: string): Record<string, string> | null {
  const forms = html.match(/<form[\s\S]*?<\/form>/g) ?? [];
  const form = forms.find((f) => f.includes(marker));
  if (!form) return null;
  const fields: Record<string, string> = {};
  let m: RegExpExecArray | null;
  const inputRe = /<input([^>]*)>/g;
  while ((m = inputRe.exec(form))) {
    const name = /name="([^"]+)"/.exec(m[1])?.[1];
    if (!name) continue;
    fields[name] = decode(/value="([^"]*)"/.exec(m[1])?.[1] ?? "");
  }
  const selRe = /<select[^>]*name="([^"]+)"([\s\S]*?)<\/select>/g;
  while ((m = selRe.exec(form))) {
    const body = m[2];
    const selected =
      /<option[^>]*selected[^>]*value="([^"]*)"/.exec(body)?.[1] ??
      /<option[^>]*value="([^"]*)"[^>]*selected/.exec(body)?.[1] ??
      /<option[^>]*value="([^"]*)"/.exec(body)?.[1] ??
      "";
    fields[m[1]] = decode(selected);
  }
  const taRe = /<textarea[^>]*name="([^"]+)"[\s\S]*?<\/textarea>/g;
  while ((m = taRe.exec(form))) fields[m[1]] = fields[m[1]] ?? "";
  return fields;
}

async function getHtml(path: string): Promise<string> {
  const r = await follow(await req(path));
  // React SSR intercala comentarios entre nodos de texto.
  return (await r.text()).replace(/<!--[\s\S]*?-->/g, "");
}

async function postForm(
  path: string,
  marker: string,
  overrides: Record<string, string>
): Promise<{ status: number; url: string; html: string }> {
  const page = await follow(await req(path));
  const html = await page.text();
  const fields = formFields(html, marker);
  if (!fields) throw new Error(`form con marcador "${marker}" no encontrado en ${path}`);
  const fd = new FormData();
  for (const [k, v] of Object.entries({ ...fields, ...overrides })) fd.append(k, v);
  const res = await follow(await req(path, { method: "POST", body: fd }));
  return { status: res.status, url: res.url, html: (await res.text()).replace(/<!--[\s\S]*?-->/g, "") };
}

async function cleanup() {
  await prisma.subscription.deleteMany({ where: { stripeSubscriptionId: { startsWith: "smoke_" } } });
  await prisma.payment.deleteMany({ where: { description: { startsWith: "SMOKE" } } });
  await prisma.client.deleteMany({ where: { name: { startsWith: "SMOKE" } } });
  await prisma.lead.deleteMany({ where: { name: { startsWith: "SMOKE" } } });
  await prisma.task.deleteMany({ where: { title: { startsWith: "SMOKE" } } });
  await prisma.user.deleteMany({ where: { email: USER_EMAIL } });
}

async function main() {
  try {
    await fetch(BASE + "/login");
  } catch {
    console.error(`No hay servidor en ${BASE}. Arranca npm run dev o npm run start primero.`);
    process.exitCode = 1;
    return;
  }

  await cleanup();
  await prisma.user.create({
    data: {
      name: "Smoke Test",
      email: USER_EMAIL,
      passwordHash: await bcrypt.hash(USER_PASS, 10),
      role: "MEMBER",
    },
  });

  // ── LOGIN ──
  const login = await postForm("/login", 'name="password"', {
    email: USER_EMAIL,
    password: USER_PASS,
  });
  check("login", login.url.includes("/dashboard"));

  // ── CAPTACIÓN + CUALIFICACIÓN ──
  await postForm("/dashboard/pipeline/new", 'name="source"', {
    name: "SMOKE Carpintería Robles",
    source: "Formulario web",
    value: "1125",
    notes: "Llamada: interesados en web corporativa.",
  });
  const pipe = await getHtml("/dashboard/pipeline");
  const leadId = /href="\/dashboard\/pipeline\/(c[a-z0-9]+)"[^>]*>SMOKE Carpintería Robles/.exec(pipe)?.[1];
  check("alta de lead visible en kanban", !!leadId);
  if (!leadId) throw new Error("sin leadId");
  const leadPath = `/dashboard/pipeline/${leadId}`;

  await postForm(leadPath, 'name="stage"', { stage: "NEGOTIATION" });
  const ficha = await getHtml(leadPath);
  check("ficha de lead: valor, notas y etapa", ficha.includes("1125,00") && ficha.includes("interesados") && ficha.includes("Negociación"));

  // ── VENTA ──
  const conv = await postForm(leadPath, "Convertir en cliente", {});
  const clientId = /\/dashboard\/clients\/(c[a-z0-9]+)/.exec(conv.url)?.[1];
  check("conversión lead→cliente", !!clientId, conv.url);
  if (!clientId) throw new Error("sin clientId");
  const clientPath = `/dashboard/clients/${clientId}`;

  const search = await getHtml("/dashboard/clients?q=Robles");
  check("buscador de clientes encuentra al nuevo", search.includes("SMOKE Carpintería Robles"));

  // ── EJECUCIÓN ──
  const proj = await postForm(`/dashboard/projects/new?clientId=${clientId}`, 'name="budget"', {
    name: "SMOKE Web corporativa",
    status: "IN_PROGRESS",
    budget: "1125",
    clientId,
  });
  const projectId = /\/dashboard\/projects\/(c[a-z0-9]+)/.exec(proj.url)?.[1];
  check("alta de proceso", !!projectId, proj.url);

  await postForm("/dashboard/tasks", 'name="title"', {
    title: "SMOKE Maquetar home",
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    clientId,
    projectId: projectId ?? "",
  });
  check("alta de tarea", (await getHtml("/dashboard/tasks")).includes("SMOKE Maquetar home"));

  await postForm(clientPath, 'name="type"', {
    type: "CALL",
    title: "SMOKE Kickoff",
    projectId: projectId ?? "",
  });
  await postForm(`/dashboard/projects/${projectId}`, 'name="type"', {
    type: "DELIVERABLE",
    title: "SMOKE Diseño v1",
    link: "https://example.com/smoke",
  });
  const expTrack = await getHtml(clientPath);
  check("seguimiento: llamada y entregable en expediente", expTrack.includes("SMOKE Kickoff") && expTrack.includes("SMOKE Diseño v1"));

  // ── COBROS ──
  await postForm("/dashboard/payments/new-manual", 'name="amount"', {
    description: "SMOKE 50% inicial",
    amount: "562.50",
    status: "PAID",
    clientId,
  });
  await postForm("/dashboard/payments/new-manual", 'name="amount"', {
    description: "SMOKE 50% final",
    amount: "562.50",
    status: "PENDING",
    clientId,
  });
  const pagos = await getHtml("/dashboard/payments");
  check("cobros: cobrado + pendiente registrados", pagos.includes("SMOKE 50% inicial") && pagos.includes("SMOKE 50% final"));

  // ── MANTENIMIENTO (simula suscripción sincronizada de Stripe) ──
  await prisma.subscription.create({
    data: {
      stripeSubscriptionId: "smoke_sub",
      status: "ACTIVE",
      planName: "SMOKE Mantenimiento",
      amountCents: 3800,
      interval: "month",
      currentPeriodEnd: new Date(Date.now() + 5 * 86400000),
      clientId,
    },
  });

  await postForm(`/dashboard/projects/${projectId}`, 'name="status"', { status: "COMPLETED" });

  // ── DIRECCIÓN ──
  const exp = await getHtml(clientPath);
  check("expediente: total cobrado 562,50 €", exp.includes("562,50"));
  check("expediente: recurrente 38,00 €", exp.includes("38,00"));
  check("expediente: origen = lead convertido", exp.includes("Lead ·"));

  const home = await getHtml("/dashboard");
  const attention = home.slice(home.indexOf("Requiere tu atención"), home.indexOf("Ingresos últimos"));
  check("atención: renovación próxima visible", attention.includes("SMOKE Mantenimiento"));
  check("atención sin ruido: pago pendiente reciente no alerta", !attention.includes("SMOKE 50% final"));
  check("atención sin ruido: tarea de mañana no alerta", !attention.includes("SMOKE Maquetar home"));
  check("atención sin ruido: sin falso upsell con suscripción activa", !attention.includes("SMOKE Carpintería Robles — sin ingreso"));

  console.log(failures === 0 ? "\nSMOKE TEST: TODO PASS" : `\nSMOKE TEST: ${failures} FALLOS`);
  process.exitCode = failures === 0 ? 0 : 1;
}

main()
  .catch((e) => {
    console.error("ERROR:", e.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await cleanup();
    await prisma.$disconnect();
  });
