import "server-only";
import { prisma } from "@/lib/prisma";

// Motor de atención y recomendación: consolida eventos operativos de todos
// los módulos en una única lista priorizada que responde a "¿qué requiere mi
// atención, por qué, y cuál es la siguiente acción?". Mecanismo transversal
// y reutilizable: el Resumen lo consume global, el expediente del cliente lo
// consume filtrado (clientId), y futuros consumidores (notificaciones, cron,
// informes) usan esta misma función sin duplicar reglas.

// Umbrales operativos (en días). Ajustables en un único sitio.
const RENEWAL_WINDOW_DAYS = 14;
const RENEWAL_URGENT_DAYS = 7;
const STALE_CLIENT_DAYS = 30;
const STALE_LEAD_DAYS = 7;
const PENDING_PAYMENT_ALERT_DAYS = 7;
const INACTIVE_PROJECT_DAYS = 14;

// 1 = crítico (rojo), 2 = importante (ámbar), 3 = seguimiento/oportunidad (azul)
export type AttentionSeverity = 1 | 2 | 3;

export type AttentionItem = {
  id: string;
  severity: AttentionSeverity;
  category: string;
  title: string;
  /** Qué pasa y por qué importa. */
  detail: string;
  /** Siguiente acción recomendada. */
  nextAction: string;
  href: string;
  /** Ordena dentro de cada severidad: lo más antiguo/próximo primero. */
  date: Date;
};

export type AttentionOptions = {
  /** Limita el análisis a un cliente (recomendaciones contextuales). */
  clientId?: string;
  now?: Date;
};

const DAY_MS = 24 * 60 * 60 * 1000;

function daysAgo(days: number, now: Date): Date {
  return new Date(now.getTime() - days * DAY_MS);
}

function daysBetween(later: Date, earlier: Date): number {
  return Math.round((later.getTime() - earlier.getTime()) / DAY_MS);
}

function plural(n: number, singular: string, pluralForm: string): string {
  return `${n} ${n === 1 ? singular : pluralForm}`;
}

export async function getAttentionItems(
  options: AttentionOptions = {}
): Promise<AttentionItem[]> {
  const now = options.now ?? new Date();
  const byClient = options.clientId ? { clientId: options.clientId } : {};
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);

  const [
    openIncidents,
    dueTasks,
    renewingSubs,
    pastDueSubs,
    agingPendingPayments,
    overdueInvoices,
    attentionProjects,
    staleLeads,
    activeClients,
    upsellClients,
  ] = await Promise.all([
    prisma.activity.findMany({
      where: { type: "INCIDENT", status: "OPEN", ...byClient },
      include: { client: { select: { id: true, name: true } } },
    }),
    prisma.task.findMany({
      where: { status: { not: "DONE" }, dueDate: { lte: endOfToday }, ...byClient },
      include: { client: { select: { name: true } } },
    }),
    prisma.subscription.findMany({
      where: {
        status: { in: ["ACTIVE", "TRIALING"] },
        currentPeriodEnd: {
          gte: now,
          lte: new Date(now.getTime() + RENEWAL_WINDOW_DAYS * DAY_MS),
        },
        ...byClient,
      },
      include: { client: { select: { id: true, name: true } } },
    }),
    prisma.subscription.findMany({
      where: { status: "PAST_DUE", ...byClient },
      include: { client: { select: { id: true, name: true } } },
    }),
    prisma.payment.findMany({
      where: {
        status: "PENDING",
        stripePaymentIntentId: null,
        stripeChargeId: null,
        createdAt: { lt: daysAgo(PENDING_PAYMENT_ALERT_DAYS, now) },
        ...byClient,
      },
      include: { client: { select: { id: true, name: true } } },
    }),
    prisma.invoice.findMany({
      where: { status: "open", dueDate: { lt: now }, ...byClient },
      include: { client: { select: { id: true, name: true } } },
    }),
    prisma.project.findMany({
      where: { status: { in: ["IN_PROGRESS", "PAUSED"] }, ...byClient },
      include: {
        client: { select: { name: true } },
        activities: { orderBy: { date: "desc" }, take: 1 },
      },
    }),
    // Los leads no tienen cliente: solo entran en el análisis global.
    options.clientId
      ? Promise.resolve([])
      : prisma.lead.findMany({
          where: {
            stage: { in: ["NEW", "CONTACTED", "PROPOSAL", "NEGOTIATION"] },
            updatedAt: { lt: daysAgo(STALE_LEAD_DAYS, now) },
          },
        }),
    prisma.client.findMany({
      where: {
        ...(options.clientId ? { id: options.clientId } : {}),
        OR: [
          { projects: { some: { status: "IN_PROGRESS" } } },
          { subscriptions: { some: { status: { in: ["ACTIVE", "TRIALING"] } } } },
        ],
      },
      include: { activities: { orderBy: { date: "desc" }, take: 1 } },
    }),
    // Oportunidad núcleo del modelo de negocio: proyecto entregado sin
    // ingreso recurrente detrás (upsell one-off → mantenimiento mensual).
    prisma.client.findMany({
      where: {
        ...(options.clientId ? { id: options.clientId } : {}),
        projects: { some: { status: "COMPLETED" } },
        subscriptions: { none: { status: { in: ["ACTIVE", "TRIALING"] } } },
      },
      include: {
        projects: {
          where: { status: "COMPLETED" },
          orderBy: { updatedAt: "desc" },
          take: 1,
        },
      },
    }),
  ]);

  const items: AttentionItem[] = [];

  for (const incident of openIncidents) {
    const age = daysBetween(now, incident.date);
    items.push({
      id: `incident:${incident.id}`,
      severity: 1,
      category: "Incidencia",
      title: incident.title,
      detail: `Abierta hace ${plural(age, "día", "días")} · ${incident.client.name}`,
      nextAction:
        "Resuélvela y márcala como resuelta en el seguimiento; el cliente está esperando",
      href: `/dashboard/clients/${incident.client.id}`,
      date: incident.date,
    });
  }

  for (const sub of pastDueSubs) {
    items.push({
      id: `pastdue:${sub.id}`,
      severity: 1,
      category: "Impago",
      title: `Suscripción impagada${sub.client ? ` de ${sub.client.name}` : ""}`,
      detail: "Stripe la marca como vencida sin cobrar — ingreso recurrente en riesgo",
      nextAction: "Contacta al cliente para regularizar el pago antes de que Stripe la cancele",
      href: sub.client
        ? `/dashboard/clients/${sub.client.id}`
        : "/dashboard/payments",
      date: sub.updatedAt,
    });
  }

  for (const inv of overdueInvoices) {
    const overdue = inv.dueDate ? daysBetween(now, inv.dueDate) : 0;
    items.push({
      id: `invoice:${inv.id}`,
      severity: 1,
      category: "Factura",
      title: `Factura vencida${inv.client ? ` de ${inv.client.name}` : ""}`,
      detail: `Venció hace ${plural(overdue, "día", "días")} sin pagarse`,
      nextAction: "Envía un recordatorio de pago con el enlace de la factura",
      href: inv.client
        ? `/dashboard/clients/${inv.client.id}`
        : "/dashboard/payments",
      date: inv.dueDate ?? inv.createdAt,
    });
  }

  for (const task of dueTasks) {
    const due = task.dueDate!;
    const overdueDays = daysBetween(now, due);
    const isOverdue =
      due < new Date(now.getFullYear(), now.getMonth(), now.getDate());
    items.push({
      id: `task:${task.id}`,
      severity: isOverdue ? 2 : 3,
      category: "Tarea",
      title: task.title,
      detail: isOverdue
        ? `Vencida hace ${plural(overdueDays, "día", "días")}${task.client ? ` · ${task.client.name}` : ""}`
        : `Vence hoy${task.client ? ` · ${task.client.name}` : ""}`,
      nextAction: isOverdue
        ? "Complétala hoy o reprograma su fecha para que el plan vuelva a ser real"
        : "Prográmala en tu día de hoy",
      href: "/dashboard/tasks",
      date: due,
    });
  }

  for (const sub of renewingSubs) {
    const inDays = daysBetween(sub.currentPeriodEnd!, now);
    items.push({
      id: `renewal:${sub.id}`,
      severity: inDays <= RENEWAL_URGENT_DAYS ? 2 : 3,
      category: "Renovación",
      title: `${sub.planName ?? "Suscripción"}${sub.client ? ` de ${sub.client.name}` : ""}`,
      detail: `Renueva en ${plural(inDays, "día", "días")} — momento de máximo riesgo de baja`,
      nextAction:
        "Contacta antes de la renovación: confirma continuidad y valora proponer una ampliación",
      href: sub.client
        ? `/dashboard/clients/${sub.client.id}`
        : "/dashboard/payments",
      date: sub.currentPeriodEnd!,
    });
  }

  for (const payment of agingPendingPayments) {
    const age = daysBetween(now, payment.createdAt);
    items.push({
      id: `pending:${payment.id}`,
      severity: 2,
      category: "Cobro pendiente",
      title: payment.description ?? "Pago manual pendiente",
      detail: `Registrado hace ${plural(age, "día", "días")} y aún sin cobrar${payment.client ? ` · ${payment.client.name}` : ""}`,
      nextAction:
        "Pregunta al cliente si la transferencia está en camino; si no se materializa, reclámala o elimínala",
      href: payment.client
        ? `/dashboard/clients/${payment.client.id}`
        : "/dashboard/payments",
      date: payment.createdAt,
    });
  }

  for (const project of attentionProjects) {
    const lastActivity = project.activities[0]?.date ?? project.updatedAt;
    if (
      project.status === "IN_PROGRESS" &&
      project.endDate &&
      project.endDate < now
    ) {
      items.push({
        id: `project-late:${project.id}`,
        severity: 2,
        category: "Proceso",
        title: `${project.name} — retrasado`,
        detail: `Fin previsto hace ${plural(daysBetween(now, project.endDate), "día", "días")} · ${project.client.name}`,
        nextAction:
          "Informa al cliente del nuevo plazo y actualiza la fecha de fin (o ciérralo si ya está entregado)",
        href: `/dashboard/projects/${project.id}`,
        date: project.endDate,
      });
    } else if (project.status === "PAUSED") {
      items.push({
        id: `project-paused:${project.id}`,
        severity: 3,
        category: "Proceso",
        title: `${project.name} — pausado`,
        detail: `Un proceso pausado sin decisión es margen parado · ${project.client.name}`,
        nextAction: "Decide: reactivar con fecha nueva o cancelar y liberar el hueco",
        href: `/dashboard/projects/${project.id}`,
        date: project.updatedAt,
      });
    } else if (lastActivity < daysAgo(INACTIVE_PROJECT_DAYS, now)) {
      items.push({
        id: `project-idle:${project.id}`,
        severity: 3,
        category: "Proceso",
        title: `${project.name} — sin actividad`,
        detail: `${plural(daysBetween(now, lastActivity), "día", "días")} sin registrar nada · ${project.client.name}`,
        nextAction: "Registra el estado real del trabajo o pausa el proceso",
        href: `/dashboard/projects/${project.id}`,
        date: lastActivity,
      });
    }
  }

  for (const lead of staleLeads) {
    const idle = daysBetween(now, lead.updatedAt);
    const negotiating =
      lead.stage === "PROPOSAL" || lead.stage === "NEGOTIATION";
    const stageLabel =
      lead.stage === "NEW"
        ? "nuevo"
        : lead.stage === "CONTACTED"
          ? "contactado"
          : lead.stage === "PROPOSAL"
            ? "propuesta"
            : "negociación";
    items.push({
      id: `lead:${lead.id}`,
      severity: negotiating ? 2 : 3,
      category: "Lead",
      title: lead.name,
      detail: `${plural(idle, "día", "días")} sin movimiento en etapa ${stageLabel}${negotiating ? " — hay dinero sobre la mesa" : ""}`,
      nextAction: negotiating
        ? "Retoma el contacto hoy: una propuesta sin respuesta se enfría cada día"
        : "Haz el primer contacto o descártalo para limpiar el pipeline",
      href: `/dashboard/pipeline/${lead.id}`,
      date: lead.updatedAt,
    });
  }

  for (const client of activeClients) {
    const lastActivity = client.activities[0]?.date ?? null;
    if (!lastActivity || lastActivity < daysAgo(STALE_CLIENT_DAYS, now)) {
      items.push({
        id: `client-stale:${client.id}`,
        severity: 3,
        category: "Cliente",
        title: `${client.name} — sin seguimiento`,
        detail: lastActivity
          ? `Última actividad hace ${plural(daysBetween(now, lastActivity), "día", "días")} — un cliente activo sin contacto es un cliente en riesgo silencioso`
          : "Cliente activo sin ninguna actividad registrada",
        nextAction: "Haz una llamada o envía un correo de seguimiento y regístralo",
        href: `/dashboard/clients/${client.id}`,
        date: lastActivity ?? client.createdAt,
      });
    }
  }

  for (const client of upsellClients) {
    const lastCompleted = client.projects[0];
    items.push({
      id: `upsell:${client.id}`,
      severity: 3,
      category: "Oportunidad",
      title: `${client.name} — sin ingreso recurrente`,
      detail: `Proyecto "${lastCompleted?.name ?? "completado"}" entregado y ninguna suscripción activa`,
      nextAction:
        "Ofrece un plan de mantenimiento mensual: es el paso natural tras la entrega",
      href: `/dashboard/clients/${client.id}`,
      date: lastCompleted?.updatedAt ?? client.updatedAt,
    });
  }

  return items.sort(
    (a, b) => a.severity - b.severity || a.date.getTime() - b.date.getTime()
  );
}
