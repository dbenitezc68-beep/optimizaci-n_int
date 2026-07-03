import { prisma } from "@/lib/prisma";
import { PageHeader, Card, Button, inputClass, labelClass } from "@/components/ui";
import { createPaymentLinkAction } from "../actions";

export default async function NewPaymentLinkPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; clientId?: string }>;
}) {
  const { error, clientId } = await searchParams;
  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div>
      <PageHeader
        title="Crear link de pago"
        description="Genera un enlace de Stripe Checkout para que el cliente pague directamente."
      />
      <Card className="max-w-xl">
        <form action={createPaymentLinkAction} className="flex flex-col gap-4">
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
              placeholder="Ej: Diseño de tienda online — primer pago"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="amount">
              Importe (EUR) *
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="1"
              step="0.01"
              required
              className={inputClass}
              placeholder="500.00"
            />
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

          <div>
            <Button type="submit">Crear link de pago</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
