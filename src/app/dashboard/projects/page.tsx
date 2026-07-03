import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCents, formatDate } from "@/lib/money";
import { Badge, Card, PageHeader } from "@/components/ui";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { client: { select: { id: true, name: true } } },
  });

  return (
    <div>
      <PageHeader
        title="Procesos"
        description={`${projects.length} procesos en total`}
        actions={
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-3.5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            + Nuevo proceso
          </Link>
        }
      />

      {projects.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-400">
            Todavía no hay procesos. Crea uno desde aquí o desde la ficha de
            un cliente.
          </p>
        </Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Proceso</th>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Estado</th>
                <th className="px-5 py-3">Presupuesto</th>
                <th className="px-5 py-3">Inicio</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-slate-800/60 last:border-0 hover:bg-slate-900/40"
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`/dashboard/projects/${p.id}`}
                      className="font-medium text-slate-100 hover:text-sky-300"
                    >
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      href={`/dashboard/clients/${p.client.id}`}
                      className="text-slate-400 hover:text-sky-300"
                    >
                      {p.client.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <Badge status={p.status} />
                  </td>
                  <td className="px-5 py-3 text-slate-400">
                    {p.budgetCents ? formatCents(p.budgetCents) : "—"}
                  </td>
                  <td className="px-5 py-3 text-slate-400">
                    {formatDate(p.startDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
