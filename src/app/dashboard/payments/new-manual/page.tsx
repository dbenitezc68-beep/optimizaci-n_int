import { prisma } from "@/lib/prisma";
import { PageHeader, Card, Button, inputClass, labelClass } from "@/components/ui";
import { createManualPaymentAction } from "../actions";

export default async function NewManualPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; clientId?: string }>;
}) {
  const { error, clientId } = await searchParams;
  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <PageHeader
        title="Registrar pago manual"
        description="Registra cobros fuera de Stripe (transferencia, efectivo, Bizum…) para que la trazabilidad y las métricas de ingresos estén completas."
      />
      <Card className="max-w-xl">
        <form action={createManualPaymentAction} className="flex flex-col gap-4">
          {error && (
            <p className="rounded-lg bg-red-950/60 px-3 py-2 text-sm text-red-300 border border-red-900">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="description">
              Descripción *
            </label>
            <input
              id="description"
              name="description"
              required
              className={inputClass}
              placeholder="Ej: Transferencia — 50% inicial web corporativa"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="amount">
                Importe (EUR) *
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                required
                className={inputClass}
                placeholder="562.50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="paidAt">
                Fecha del cobro
              </label>
              <input
                id="paidAt"
                name="paidAt"
                type="date"
                defaultValue={today}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="status">
                Estado
              </label>
              <select id="status" name="status" defaultValue="PAID" className={inputClass}>
                <option value="PAID">Cobrado</option>
                <option value="PENDING">Pendiente de cobro</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="clientId">
                Cliente (opcional)
              </label>
              <select
                id="clientId"
                name="clientId"
                defaultValue={clientId ?? ""}
                className={inputClass}
              >
                <option value="">Sin asociar</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Los pagos pendientes no cuentan en los ingresos hasta que los
            marques como cobrados desde la lista de pagos.
          </p>

          <div>
            <Button type="submit">Registrar pago</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
