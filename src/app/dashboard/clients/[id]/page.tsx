import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCents, formatDate } from "@/lib/money";
import { monthlyFactor } from "@/lib/metrics";
import { Badge, Card, PageHeader, StatCard } from "@/components/ui";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";
import { deleteClientAction } from "../actions";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [client, originLead] = await Promise.all([
    prisma.client.findUnique({
      where: { id },
      include: {
        projects: { orderBy: { createdAt: "desc" } },
        tasks: { orderBy: { createdAt: "desc" } },
        payments: { orderBy: { createdAt: "desc" } },
        subscriptions: { orderBy: { createdAt: "desc" } },
        invoices: { orderBy: { createdAt: "desc" } },
        paymentLinks: { orderBy: { createdAt: "desc" } },
      },
    }),
    prisma.lead.findFirst({ where: { convertedClientId: id } }),
  ]);

  if (!client) notFound();

  // Resumen financiero del expediente: todo el estado económico del cliente
  // de un vistazo, sin salir de esta página.
  const paidCents = client.payments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.amountCents, 0);
  const pendingPaymentsCents = client.payments
    .filter((p) => p.status === "PENDING")
    .reduce((sum, p) => sum + p.amountCents, 0);
  const openInvoicesCents = client.invoices
    .filter((inv) => inv.status === "open")
    .reduce((sum, inv) => sum + inv.amountDueCents - inv.amountPaidCents, 0);
  const recurringCents = Math.round(
    client.subscriptions
      .filter((s) => s.status === "ACTIVE" || s.status === "TRIALING")
      .reduce((sum, s) => sum + s.amountCents * monthlyFactor(s.interval), 0)
  );

  return (
    <div>
      <PageHeader
        title={client.name}
        description={client.company ?? undefined}
        actions={
          <>
            <Link
              href={`/dashboard/payments/new-manual?clientId=${client.id}`}
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:border-sky-500 hover:text-sky-300"
            >
              + Registrar pago
            </Link>
            <Link
              href={`/dashboard/payments/new-link?clientId=${client.id}`}
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:border-sky-500 hover:text-sky-300"
            >
              + Link de pago
            </Link>
            <Link
              href={`/dashboard/clients/${client.id}/edit`}
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:border-sky-500 hover:text-sky-300"
            >
              Editar
            </Link>
            <form action={deleteClientAction}>
              <input type="hidden" name="clientId" value={client.id} />
              <ConfirmSubmitButton confirmMessage="¿Eliminar este cliente y todos sus datos asociados?">
                Eliminar
              </ConfirmSubmitButton>
            </form>
          </>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total cobrado" value={formatCents(paidCents)} />
        <StatCard
          label="Pendiente de cobro"
          value={formatCents(pendingPaymentsCents + openInvoicesCents)}
          hint={
            openInvoicesCents > 0
              ? `Incluye ${formatCents(openInvoicesCents)} en facturas abiertas`
              : undefined
          }
        />
        <StatCard
          label="Recurrente mensual"
          value={formatCents(recurringCents)}
          hint="Suscripciones activas normalizadas a mes"
        />
        <StatCard
          label="Procesos activos"
          value={String(
            client.projects.filter((p) => p.status === "IN_PROGRESS").length
          )}
          hint={`${client.projects.length} en total`}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <h2 className="mb-3 text-sm font-semibold text-slate-200">
            Información de contacto
          </h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Email</dt>
              <dd className="text-slate-300">
                {client.email ? (
                  <a
                    href={`mailto:${client.email}`}
                    className="text-sky-400 hover:text-sky-300"
                  >
                    {client.email}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Teléfono</dt>
              <dd className="text-slate-300">
                {client.phone ? (
                  <a
                    href={`tel:${client.phone}`}
                    className="text-sky-400 hover:text-sky-300"
                  >
                    {client.phone}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">País</dt>
              <dd className="text-slate-300">{client.country ?? "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Cliente desde</dt>
              <dd className="text-slate-300">{formatDate(client.createdAt)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Origen</dt>
              <dd className="text-slate-300">
                {originLead ? (
                  <Link
                    href={`/dashboard/pipeline/${originLead.id}`}
                    className="text-sky-400 hover:text-sky-300"
                  >
                    Lead{originLead.source ? ` · ${originLead.source}` : ""} →
                  </Link>
                ) : (
                  "Alta directa"
                )}
              </dd>
            </div>
          </dl>
          {client.notes && (
            <p className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-950 p-3 text-sm text-slate-400">
              {client.notes}
            </p>
          )}
        </Card>

        <Card className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200">Procesos</h2>
            <Link
              href={`/dashboard/projects/new?clientId=${client.id}`}
              className="text-sm font-medium text-sky-400 hover:text-sky-300"
            >
              + Nuevo proceso
            </Link>
          </div>
          {client.projects.length === 0 ? (
            <p className="text-sm text-slate-500">Sin procesos todavía.</p>
          ) : (
            <div className="space-y-2">
              {client.projects.map((p) => (
                <Link
                  key={p.id}
                  href={`/dashboard/projects/${p.id}`}
                  className="flex items-center justify-between rounded-lg border border-slate-800 px-3 py-2 text-sm hover:border-sky-700"
                >
                  <span className="text-slate-200">{p.name}</span>
                  <Badge status={p.status} />
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200">Tareas</h2>
            <Link
              href={`/dashboard/tasks?clientId=${client.id}`}
              className="text-sm font-medium text-sky-400 hover:text-sky-300"
            >
              Gestionar →
            </Link>
          </div>
          {client.tasks.length === 0 ? (
            <p className="text-sm text-slate-500">Sin tareas todavía.</p>
          ) : (
            <div className="space-y-2">
              {client.tasks.slice(0, 6).map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-300">{t.title}</span>
                  <Badge status={t.status} />
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="mb-3 text-sm font-semibold text-slate-200">
            Suscripciones
          </h2>
          {client.subscriptions.length === 0 ? (
            <p className="text-sm text-slate-500">Sin suscripciones.</p>
          ) : (
            <div className="space-y-2">
              {client.subscriptions.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-300">
                    {formatCents(s.amountCents, s.currency.toUpperCase())} /{" "}
                    {s.interval}
                  </span>
                  <Badge status={s.status} />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <h2 className="px-5 pt-5 text-sm font-semibold text-slate-200">
          Historial económico
        </h2>
        {client.payments.length === 0 &&
        client.paymentLinks.length === 0 &&
        client.invoices.length === 0 ? (
          <p className="px-5 pb-5 pt-2 text-sm text-slate-500">
            Sin movimientos todavía. Usa &quot;+ Registrar pago&quot; o
            &quot;+ Link de pago&quot; para cobrar a este cliente.
          </p>
        ) : (
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-2">Tipo</th>
                <th className="px-5 py-2">Descripción</th>
                <th className="px-5 py-2">Fecha</th>
                <th className="px-5 py-2">Importe</th>
                <th className="px-5 py-2">Estado / enlace</th>
              </tr>
            </thead>
            <tbody>
              {client.payments.map((p) => (
                <tr key={p.id} className="border-b border-slate-800/60">
                  <td className="px-5 py-2 text-slate-400">
                    {p.stripePaymentIntentId || p.stripeChargeId
                      ? "Pago · Stripe"
                      : "Pago · manual"}
                  </td>
                  <td className="px-5 py-2 text-slate-300">
                    {p.description ?? "—"}
                  </td>
                  <td className="px-5 py-2 text-slate-400">
                    {formatDate(p.paidAt ?? p.createdAt)}
                  </td>
                  <td className="px-5 py-2 font-medium text-slate-200">
                    {formatCents(p.amountCents, p.currency.toUpperCase())}
                  </td>
                  <td className="px-5 py-2">
                    <Badge status={p.status} />
                  </td>
                </tr>
              ))}
              {client.invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-slate-800/60">
                  <td className="px-5 py-2 text-slate-400">Factura</td>
                  <td className="px-5 py-2 text-slate-300">
                    {inv.stripeInvoiceId}
                  </td>
                  <td className="px-5 py-2 text-slate-400">
                    {formatDate(inv.paidAt ?? inv.dueDate ?? inv.createdAt)}
                  </td>
                  <td className="px-5 py-2 font-medium text-slate-200">
                    {formatCents(inv.amountDueCents, inv.currency.toUpperCase())}
                  </td>
                  <td className="px-5 py-2">
                    {inv.hostedInvoiceUrl ? (
                      <a
                        href={inv.hostedInvoiceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:text-sky-300"
                      >
                        {inv.status} · ver factura
                      </a>
                    ) : (
                      <span className="text-slate-400">{inv.status}</span>
                    )}
                  </td>
                </tr>
              ))}
              {client.paymentLinks.map((l) => (
                <tr key={l.id} className="border-b border-slate-800/60 last:border-0">
                  <td className="px-5 py-2 text-slate-400">Link de pago</td>
                  <td className="px-5 py-2 text-slate-300">
                    {l.description ?? "—"}
                  </td>
                  <td className="px-5 py-2 text-slate-400">
                    {formatDate(l.createdAt)}
                  </td>
                  <td className="px-5 py-2 font-medium text-slate-200">
                    {formatCents(l.amountCents, l.currency.toUpperCase())}
                  </td>
                  <td className="px-5 py-2">
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-400 hover:text-sky-300"
                    >
                      Abrir enlace
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
