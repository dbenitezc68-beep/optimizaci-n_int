import Link from "next/link";
import type { Activity } from "@/generated/prisma/client";
import { formatDate } from "@/lib/money";
import { ACTIVITY_TYPE_LABELS, ACTIVITY_TYPE_OPTIONS } from "@/lib/domain";
import { Badge, Button, Card, inputClass, labelClass } from "@/components/ui";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";
import {
  createActivityAction,
  deleteActivityAction,
  resolveIncidentAction,
} from "@/app/dashboard/clients/activity-actions";

type ActivityWithProject = Activity & {
  project: { id: string; name: string } | null;
};

export function ActivityTimeline({
  activities,
  clientId,
  projectId,
  projects,
  returnTo,
  error,
}: {
  activities: ActivityWithProject[];
  clientId: string;
  /** Fijado cuando la timeline vive en la página de un proceso. */
  projectId?: string;
  /** Procesos del cliente, para asociar opcionalmente (solo expediente). */
  projects?: { id: string; name: string }[];
  returnTo: string;
  error?: string;
}) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <Card className="mt-6">
      <h2 className="mb-4 text-sm font-semibold text-slate-200">
        Seguimiento
      </h2>

      <form
        action={createActivityAction}
        className="mb-5 rounded-lg border border-slate-800 bg-slate-950/60 p-4"
      >
        {error && (
          <p className="mb-3 rounded-lg bg-red-950/60 px-3 py-2 text-sm text-red-300 border border-red-900">
            {error}
          </p>
        )}
        <input type="hidden" name="clientId" value={clientId} />
        {projectId && <input type="hidden" name="projectId" value={projectId} />}
        <input type="hidden" name="returnTo" value={returnTo} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="activity-type">
              Tipo
            </label>
            <select
              id="activity-type"
              name="type"
              defaultValue="NOTE"
              className={inputClass}
            >
              {ACTIVITY_TYPE_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5 lg:col-span-2">
            <label className={labelClass} htmlFor="activity-title">
              Título *
            </label>
            <input
              id="activity-title"
              name="title"
              required
              className={inputClass}
              placeholder="Ej: Llamada de seguimiento, entrega de la home…"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="activity-date">
              Fecha
            </label>
            <input
              id="activity-date"
              name="date"
              type="date"
              defaultValue={today}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className={labelClass} htmlFor="activity-link">
              Enlace (entregable, documento…)
            </label>
            <input
              id="activity-link"
              name="link"
              type="url"
              placeholder="https://…"
              className={inputClass}
            />
          </div>
          {projects && projects.length > 0 && (
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className={labelClass} htmlFor="activity-project">
                Proceso (opcional)
              </label>
              <select
                id="activity-project"
                name="projectId"
                defaultValue=""
                className={inputClass}
              >
                <option value="">Sin asociar</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-4">
            <label className={labelClass} htmlFor="activity-detail">
              Detalle
            </label>
            <textarea
              id="activity-detail"
              name="detail"
              rows={2}
              className={inputClass}
            />
          </div>
        </div>
        <div className="mt-3">
          <Button type="submit">Registrar actividad</Button>
        </div>
      </form>

      {activities.length === 0 ? (
        <p className="text-sm text-slate-500">
          Sin actividad registrada todavía.
        </p>
      ) : (
        <ol className="space-y-3">
          {activities.map((a) => (
            <li
              key={a.id}
              className="rounded-lg border border-slate-800 px-4 py-3 text-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
                    {ACTIVITY_TYPE_LABELS[a.type]}
                  </span>
                  <span className="font-medium text-slate-200">{a.title}</span>
                  {a.status && <Badge status={a.status} />}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">
                    {formatDate(a.date)}
                  </span>
                  {a.type === "INCIDENT" && a.status === "OPEN" && (
                    <form action={resolveIncidentAction}>
                      <input type="hidden" name="activityId" value={a.id} />
                      <button
                        type="submit"
                        className="text-xs font-medium text-emerald-400 hover:text-emerald-300"
                      >
                        Marcar resuelta
                      </button>
                    </form>
                  )}
                  <form action={deleteActivityAction}>
                    <input type="hidden" name="activityId" value={a.id} />
                    <ConfirmSubmitButton confirmMessage="¿Eliminar esta actividad?">
                      <span className="text-xs">Eliminar</span>
                    </ConfirmSubmitButton>
                  </form>
                </div>
              </div>
              {(a.detail || a.link || (!projectId && a.project)) && (
                <div className="mt-2 space-y-1 text-slate-400">
                  {a.detail && <p className="whitespace-pre-wrap">{a.detail}</p>}
                  <div className="flex flex-wrap gap-4 text-xs">
                    {a.link && (
                      <a
                        href={a.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:text-sky-300"
                      >
                        Abrir enlace →
                      </a>
                    )}
                    {!projectId && a.project && (
                      <Link
                        href={`/dashboard/projects/${a.project.id}`}
                        className="text-sky-400 hover:text-sky-300"
                      >
                        Proceso: {a.project.name} →
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}
