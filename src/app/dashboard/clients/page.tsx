import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader, Card } from "@/components/ui";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{
    imported?: string;
    skipped?: string;
    invalid?: string;
    q?: string;
  }>;
}) {
  const { imported, skipped, invalid, q } = await searchParams;
  const query = q?.trim() || undefined;
  const clients = await prisma.client.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query } },
            { company: { contains: query } },
            { email: { contains: query } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { projects: true, tasks: true, payments: true } },
    },
  });

  return (
    <div>
      <PageHeader
        title="Clientes"
        description={
          query
            ? `${clients.length} resultados para "${query}"`
            : `${clients.length} clientes registrados`
        }
        actions={
          <>
            <Link
              href="/dashboard/clients/import"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:border-sky-500 hover:text-sky-300"
            >
              Importar CSV
            </Link>
            <Link
              href="/dashboard/clients/new"
              className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-3.5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
            >
              + Nuevo cliente
            </Link>
          </>
        }
      />

      {imported !== undefined && (
        <p className="mb-4 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2.5 text-sm text-emerald-300">
          Importación completada: {imported} clientes nuevos
          {skipped && Number(skipped) > 0
            ? `, ${skipped} omitidos por email ya existente`
            : ""}
          {invalid && Number(invalid) > 0
            ? `, ${invalid} filas descartadas por datos inválidos`
            : ""}
          .
        </p>
      )}

      <form method="get" action="/dashboard/clients" className="mb-4 flex max-w-md gap-2">
        <input
          type="search"
          name="q"
          defaultValue={query ?? ""}
          placeholder="Buscar por nombre, empresa o email…"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
        <button
          type="submit"
          className="rounded-lg border border-slate-700 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:border-sky-500 hover:text-sky-300"
        >
          Buscar
        </button>
      </form>

      {clients.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-400">
            {query
              ? `Sin resultados para "${query}".`
              : "Todavía no hay clientes. Crea el primero para empezar a asociarle procesos, tareas y pagos."}
          </p>
        </Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Nombre</th>
                <th className="px-5 py-3">Empresa</th>
                <th className="px-5 py-3">Contacto</th>
                <th className="px-5 py-3">País</th>
                <th className="px-5 py-3">Procesos</th>
                <th className="px-5 py-3">Tareas</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-slate-800/60 last:border-0 hover:bg-slate-900/40"
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`/dashboard/clients/${c.id}`}
                      className="font-medium text-slate-100 hover:text-sky-300"
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-slate-400">
                    {c.company ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-slate-400">
                    {c.email ?? c.phone ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-slate-400">
                    {c.country ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-slate-400">
                    {c._count.projects}
                  </td>
                  <td className="px-5 py-3 text-slate-400">{c._count.tasks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
