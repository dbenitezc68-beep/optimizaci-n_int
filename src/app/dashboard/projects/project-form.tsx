import { inputClass, labelClass, Button } from "@/components/ui";
import { PROJECT_STATUS_OPTIONS } from "@/lib/domain";
import type { Project } from "@/generated/prisma/client";

function toInputDate(date: Date | null | undefined) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

export function ProjectForm({
  action,
  project,
  clients,
  fixedClientId,
  error,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  project?: Pick<
    Project,
    "name" | "description" | "status" | "budgetCents" | "startDate" | "endDate"
  >;
  clients?: { id: string; name: string }[];
  fixedClientId?: string;
  error?: string;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex flex-col gap-4">
      {error && (
        <p className="rounded-lg bg-red-950/60 px-3 py-2 text-sm text-red-300 border border-red-900">
          {error}
        </p>
      )}

      {clients && (
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="clientId">
            Cliente *
          </label>
          <select
            id="clientId"
            name="clientId"
            required
            defaultValue={fixedClientId ?? ""}
            className={inputClass}
          >
            <option value="" disabled>
              Selecciona un cliente
            </option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="name">
          Nombre del proceso *
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={project?.name}
          className={inputClass}
          placeholder="Ej: Tienda online, automatización de pedidos…"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="description">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={project?.description ?? ""}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="status">
            Estado
          </label>
          <select
            id="status"
            name="status"
            defaultValue={project?.status ?? "PLANNED"}
            className={inputClass}
          >
            {PROJECT_STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="budget">
            Presupuesto (EUR)
          </label>
          <input
            id="budget"
            name="budget"
            type="number"
            min="0"
            step="0.01"
            defaultValue={
              project?.budgetCents ? project.budgetCents / 100 : undefined
            }
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="startDate">
            Fecha de inicio
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={toInputDate(project?.startDate)}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="endDate">
            Fecha de fin
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={toInputDate(project?.endDate)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
