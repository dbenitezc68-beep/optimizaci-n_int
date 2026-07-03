import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCents, formatDate } from "@/lib/money";
import { Badge, Card, PageHeader, Button } from "@/components/ui";
import { isStripeConfigured } from "@/lib/stripe";
import { syncStripeAction } from "./actions";

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; synced?: string }>;
}) {
  const { error, synced } = await searchParams;

  const [payments, subscriptions, invoices, paymentLinks] = await Promise.all([
    prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      take: 30,
      include: { client: { select: { name: true } } },
    }),
    prisma.subscription.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: { select: { name: true } } },
    }),
    prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: { client: { select: { name: true } } },
    }),
    prisma.paymentLink.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: { select: { name: true } } },
    }),
  ]);

  const configured = isStripeConfigured();

  return (
    <div>
      <PageHeader
        title="Pagos"
        description="Pagos, suscripciones y facturas sincronizadas desde Stripe."
        actions={
          <>
            <Link
              href="/dashboard/payments/new-link"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:border-sky-500 hover:text-sky-300"
            >
              + Link de pago
            </Link>
            <form action={syncStripeAction}>
              <Button type="submit" disabled={!configured}>
                Sincronizar con Stripe
              </Button>
            </form>
          </>
        }
      />

      {!configured && (
        <Card className="mb-4 border-amber-900 bg-amber-950/30">
          <p className="text-sm text-amber-300">
            Stripe no está configurado todavía.{" "}
            <Link href="/dashboard/settings" className="underline">
              Ve a Ajustes
            </Link>{" "}
            para añadir tu clave secreta antes de sincronizar o crear links de
            pago.
          </p>
        </Card>
      )}
      {error && (
        <Card className="mb-4 border-red-900 bg-red-950/30">
          <p className="text-sm text-red-300">{error}</p>
        </Card>
      )}
      {synced && (
        <Card className="mb-4 border-emerald-900 bg-emerald-950/30">
          <p className="text-sm text-emerald-300">
            Sincronización completada: {synced} registros procesados desde
            Stripe.
          </p>
        </Card>
      )}

      <Card className="mb-6">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">
          Suscripciones activas
        </h2>
        {subscriptions.length === 0 ? (
          <p className="text-sm text-slate-500">Sin suscripciones todavía.</p>
        ) : (
          <div className="space-y-2">
            {subscriptions.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between border-b border-slate-800 py-2 text-sm last:border-0"
              >
                <div>
                  <div className="font-medium text-slate-200">
                    {s.client?.name ?? "Sin cliente"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {s.planName ?? "Plan"} · cada {s.interval}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-200">
                    {formatCents(s.amountCents, s.currency.toUpperCase())}
                  </span>
                  <Badge status={s.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="mb-6 overflow-x-auto p-0">
        <h2 className="px-5 pt-5 text-sm font-semibold text-slate-200">
          Pagos
        </h2>
        {payments.length === 0 ? (
          <p className="px-5 pb-5 pt-2 text-sm text-slate-500">
            Sin pagos sincronizados todavía.
          </p>
        ) : (
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-2">Cliente</th>
                <th className="px-5 py-2">Descripción</th>
                <th className="px-5 py-2">Fecha</th>
                <th className="px-5 py-2">Importe</th>
                <th className="px-5 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-slate-800/60 last:border-0">
                  <td className="px-5 py-2 text-slate-300">
                    {p.client?.name ?? "—"}
                  </td>
                  <td className="px-5 py-2 text-slate-400">
                    {p.description ?? "—"}
                  </td>
                  <td className="px-5 py-2 text-slate-400">
                    {formatDate(p.createdAt)}
                  </td>
                  <td className="px-5 py-2 font-medium text-slate-200">
                    {formatCents(p.amountCents, p.currency.toUpperCase())}
                  </td>
                  <td className="px-5 py-2">
                    <Badge status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Card className="mb-6 overflow-x-auto p-0">
        <h2 className="px-5 pt-5 text-sm font-semibold text-slate-200">
          Facturas
        </h2>
        {invoices.length === 0 ? (
          <p className="px-5 pb-5 pt-2 text-sm text-slate-500">
            Sin facturas sincronizadas todavía.
          </p>
        ) : (
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-2">Cliente</th>
                <th className="px-5 py-2">Importe</th>
                <th className="px-5 py-2">Estado</th>
                <th className="px-5 py-2">Vencimiento</th>
                <th className="px-5 py-2">Enlace</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-slate-800/60 last:border-0">
                  <td className="px-5 py-2 text-slate-300">
                    {inv.client?.name ?? "—"}
                  </td>
                  <td className="px-5 py-2 font-medium text-slate-200">
                    {formatCents(inv.amountDueCents, inv.currency.toUpperCase())}
                  </td>
                  <td className="px-5 py-2 text-slate-400">{inv.status}</td>
                  <td className="px-5 py-2 text-slate-400">
                    {formatDate(inv.dueDate)}
                  </td>
                  <td className="px-5 py-2">
                    {inv.hostedInvoiceUrl && (
                      <a
                        href={inv.hostedInvoiceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:text-sky-300"
                      >
                        Ver factura
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Card className="overflow-x-auto p-0">
        <h2 className="px-5 pt-5 text-sm font-semibold text-slate-200">
          Links de pago creados
        </h2>
        {paymentLinks.length === 0 ? (
          <p className="px-5 pb-5 pt-2 text-sm text-slate-500">
            Todavía no has creado ningún link de pago.
          </p>
        ) : (
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-2">Descripción</th>
                <th className="px-5 py-2">Cliente</th>
                <th className="px-5 py-2">Importe</th>
                <th className="px-5 py-2">Enlace</th>
              </tr>
            </thead>
            <tbody>
              {paymentLinks.map((link) => (
                <tr key={link.id} className="border-b border-slate-800/60 last:border-0">
                  <td className="px-5 py-2 text-slate-300">
                    {link.description ?? "—"}
                  </td>
                  <td className="px-5 py-2 text-slate-400">
                    {link.client?.name ?? "—"}
                  </td>
                  <td className="px-5 py-2 font-medium text-slate-200">
                    {formatCents(link.amountCents, link.currency.toUpperCase())}
                  </td>
                  <td className="px-5 py-2">
                    <a
                      href={link.url}
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
