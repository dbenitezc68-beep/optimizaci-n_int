import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/money";
import { Card, PageHeader, Button, inputClass } from "@/components/ui";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";
import { TaskStatusSelect } from "./task-status-select";
import { createTaskAction, deleteTaskAction, updateTaskStatusAction } from "./actions";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string; projectId?: string }>;
}) {
  const { clientId, projectId } = await searchParams;

  const [tasks, clients, projects] = await Promise.all([
    prisma.task.findMany({
      where: {
        clientId: clientId || undefined,
        projectId: projectId || undefined,
      },
      orderBy: [{ status: "asc" }, { dueDate: "asc" }],
      include: {
        client: { select: { name: true } },
        project: { select: { name: true } },
      },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.project.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  return (
    <div>
      <PageHeader
        title="Tareas"
        description={`${tasks.length} tareas${clientId || projectId ? " (filtradas)" : ""}`}
      />

      <Card className="mb-6">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">
          Nueva tarea
        </h2>
        <form action={createTaskAction} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <input
            name="title"
            required
            placeholder="Título de la tarea"
            className={`${inputClass} lg:col-span-2`}
          />
          <select name="clientId" defaultValue={clientId ?? ""} className={inputClass}>
            <option value="">Sin cliente</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select name="projectId" defaultValue={projectId ?? ""} className={inputClass}>
            <option value="">Sin proceso</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <input
            name="dueDate"
            type="date"
            className={inputClass}
          />
          <input
            name="description"
            placeholder="Descripción (opcional)"
            className={`${inputClass} lg:col-span-2`}
          />
          <div>
            <Button type="submit">Añadir tarea</Button>
          </div>
        </form>
      </Card>

      {tasks.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-400">No hay tareas que mostrar.</p>
        </Card>
      ) : (
        <Card className="p-0">
          <div className="divide-y divide-slate-800">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"
              >
                <div>
                  <div className="text-sm font-medium text-slate-200">
                    {t.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    {[t.client?.name, t.project?.name, t.dueDate ? `vence ${formatDate(t.dueDate)}` : null]
                      .filter(Boolean)
                      .join(" · ") || "Sin asociar"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TaskStatusSelect
                    action={updateTaskStatusAction.bind(null, t.id)}
                    defaultValue={t.status}
                  />
                  <form action={deleteTaskAction}>
                    <input type="hidden" name="taskId" value={t.id} />
                    <ConfirmSubmitButton confirmMessage="¿Eliminar esta tarea?">
                      Eliminar
                    </ConfirmSubmitButton>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
