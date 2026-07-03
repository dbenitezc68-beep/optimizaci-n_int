import { PageHeader, Card, Button, inputClass, labelClass } from "@/components/ui";
import { createLeadAction } from "../actions";

export default async function NewLeadPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <PageHeader
        title="Nuevo lead"
        description="Registra una oportunidad comercial en el pipeline."
      />
      <Card className="max-w-xl">
        <form action={createLeadAction} className="flex flex-col gap-4">
          {error && (
            <p className="rounded-lg bg-red-950/60 px-3 py-2 text-sm text-red-300 border border-red-900">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="name">
              Nombre *
            </label>
            <input id="name" name="name" required className={inputClass} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="company">
                Empresa
              </label>
              <input id="company" name="company" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="source">
                Origen
              </label>
              <input
                id="source"
                name="source"
                placeholder="Web, referido, LinkedIn…"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="email">
                Email
              </label>
              <input id="email" name="email" type="email" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="phone">
                Teléfono
              </label>
              <input id="phone" name="phone" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="value">
                Valor estimado (EUR)
              </label>
              <input
                id="value"
                name="value"
                type="number"
                min="0"
                step="0.01"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="notes">
              Notas
            </label>
            <textarea id="notes" name="notes" rows={3} className={inputClass} />
          </div>

          <div>
            <Button type="submit">Crear lead</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
