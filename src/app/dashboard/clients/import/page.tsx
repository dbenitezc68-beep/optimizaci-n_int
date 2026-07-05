import { PageHeader, Card, Button, inputClass, labelClass } from "@/components/ui";
import { importClientsAction } from "../actions";

export default async function ImportClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <PageHeader
        title="Importar clientes desde CSV"
        description="Carga masiva de clientes: migración inicial, exportaciones de otras herramientas o listados propios."
      />

      <Card className="mb-6 max-w-xl">
        <form action={importClientsAction} className="flex flex-col gap-4">
          {error && (
            <p className="rounded-lg bg-red-950/60 px-3 py-2 text-sm text-red-300 border border-red-900">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="file">
              Archivo CSV *
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept=".csv,text/csv"
              required
              className={inputClass}
            />
          </div>

          <div>
            <Button type="submit">Importar clientes</Button>
          </div>
        </form>
      </Card>

      <Card className="max-w-xl">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">
          Formato esperado
        </h2>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-400">
          <li>
            Primera fila: cabeceras. Se aceptan en español o inglés y en
            cualquier orden:{" "}
            <code className="text-sky-300">
              nombre, empresa, email, telefono, pais, notas
            </code>
            . Las columnas desconocidas se ignoran.
          </li>
          <li>
            Separador coma o punto y coma (el de Excel en español) — se
            detecta automáticamente. Codificación UTF-8.
          </li>
          <li>
            <code className="text-sky-300">nombre</code> es obligatorio; las
            filas sin nombre o con email mal formado se descartan y se
            informa cuántas.
          </li>
          <li>
            Si el email ya existe (en la base o repetido en el archivo), la
            fila se omite: reimportar el mismo CSV no duplica clientes.
          </li>
        </ul>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-400">
{`nombre;empresa;email;telefono;pais;notas
Ana García;Floristería Pétalos;ana@petalos.es;600111222;España;Referida por CostaFlora
Juan Pérez;;juan@gmail.com;;;`}
        </pre>
      </Card>
    </div>
  );
}
