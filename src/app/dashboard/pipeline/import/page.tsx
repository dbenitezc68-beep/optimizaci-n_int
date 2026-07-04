import { Badge, Button, Card, PageHeader, inputClass, labelClass } from "@/components/ui";
import { getLeadFinderDbPath, isLeadFinderConfigured } from "@/lib/leadfinder";
import { importFromLeadFinderAction } from "../actions";

export default async function ImportLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const dbPath = getLeadFinderDbPath();
  const configured = isLeadFinderConfigured();

  return (
    <div>
      <PageHeader
        title="Importar de LeadFinder"
        description="Trae al pipeline los negocios prospectados por el motor de prospección, sin duplicar los ya importados."
      />

      <Card className="mb-6 max-w-xl">
        <h2 className="mb-4 text-sm font-semibold text-slate-200">
          Conexión con LeadFinder
        </h2>
        <div className="text-xs uppercase tracking-wide text-slate-500">
          Base de datos (LEADFINDER_DB_PATH)
        </div>
        <div className="mt-1 flex items-center gap-2">
          <Badge status={configured ? "PAID" : "FAILED"} />
          <span className="text-sm text-slate-400">
            {configured
              ? dbPath
              : dbPath
                ? `No se encuentra el archivo: ${dbPath}`
                : "Sin configurar — añade LEADFINDER_DB_PATH en .env y reinicia el servidor"}
          </span>
        </div>
      </Card>

      <Card className="max-w-xl">
        <form action={importFromLeadFinderAction} className="flex flex-col gap-4">
          {error && (
            <p className="rounded-lg bg-red-950/60 px-3 py-2 text-sm text-red-300 border border-red-900">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="minScore">
              Nivel de interés mínimo
            </label>
            <select id="minScore" name="minScore" className={inputClass} defaultValue="alta">
              <option value="alta">Solo interés alto (recomendado)</option>
              <option value="media">Interés alto y medio</option>
              <option value="baja">Todos los no descartados</option>
            </select>
            <p className="text-xs text-slate-500">
              Se importan negocios en estado nuevo, contactado o en proceso.
              Los descartados y cerrados en LeadFinder nunca se importan, y un
              negocio ya importado no se duplica aunque repitas la importación.
            </p>
          </div>

          <div>
            <Button type="submit" disabled={!configured}>
              Importar leads
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
