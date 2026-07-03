import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader, Card } from "@/components/ui";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { projects: true, tasks: true, payments: true } },
    },
  });

  return (
    <div>
      <PageHeader
        title="Clientes"
        description={`${clients.length} clientes registrados`}
        actions={
          <Link
            href="/dashboard/clients/new"
            className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-3.5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            + Nuevo cliente
          </Link>
        }
      />

      {clients.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-400">
            Todavía no hay clientes. Crea el primero para empezar a asociarle
            procesos, tareas y pagos.
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
