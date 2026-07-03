import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCents, formatDate } from "@/lib/money";
import { Badge, Card, PageHeader, inputClass } from "@/components/ui";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";
import { deleteProjectAction, updateProjectStatusAction } from "../actions";

const STATUS_OPTIONS = [
  { value: "PLANNED", label: "Planificado" },
  { value: "IN_PROGRESS", label: "En curso" },
  { value: "PAUSED", label: "Pausado" },
  { value: "COMPLETED", label: "Completado" },
  { value: "CANCELLED", label: "Cancelado" },
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      client: { select: { id: true, name: true } },
      tasks: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!project) notFound();

  return (
    <div>
      <PageHeader
        title={project.name}
        description={`Cliente: ${project.client.name}`}
        actions={
          <>
            <Link
              href={`/dashboard/tasks?projectId=${project.id}`}
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:border-sky-500 hover:text-sky-300"
            >
              + Tarea
            </Link>
            <Link
              href={`/dashboard/projects/${project.id}/edit`}
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:border-sky-500 hover:text-sky-300"
            >
              Editar
            </Link>
            <form action={deleteProjectAction}>
              <input type="hidden" name="projectId" value={project.id} />
              <ConfirmSubmitButton confirmMessage="¿Eliminar este proceso y sus tareas asociadas?">
                Eliminar
              </ConfirmSubmitButton>
            </form>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <h2 className="mb-3 text-sm font-semibold text-slate-200">Estado</h2>
          <form
            action={updateProjectStatusAction.bind(null, project.id)}
            className="flex items-center gap-2"
          >
            <select name="status" defaultValue={project.status} className={inputClass}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Guardar
            </button>
          </form>

          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Presupuesto</dt>
              <dd className="text-slate-300">
                {project.budgetCents ? formatCents(project.budgetCents) : "—"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Inicio</dt>
              <dd className="text-slate-300">{formatDate(project.startDate)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Fin</dt>
              <dd className="text-slate-300">{formatDate(project.endDate)}</dd>
            </div>
          </dl>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-slate-200">
            Descripción
          </h2>
          <p className="whitespace-pre-wrap text-sm text-slate-400">
            {project.description || "Sin descripción."}
          </p>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">Tareas</h2>
        {project.tasks.length === 0 ? (
          <p className="text-sm text-slate-500">
            Sin tareas todavía para este proceso.
          </p>
        ) : (
          <div className="space-y-2">
            {project.tasks.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between border-b border-slate-800 py-2 text-sm last:border-0"
              >
                <span className="text-slate-300">{t.title}</span>
                <Badge status={t.status} />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
