import { inputClass, labelClass, Button } from "@/components/ui";
import type { Lead } from "@/generated/prisma/client";

export function LeadForm({
  action,
  lead,
  error,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  lead?: Pick<
    Lead,
    "name" | "company" | "email" | "phone" | "source" | "notes" | "valueCents"
  >;
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

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="name">
          Nombre *
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={lead?.name}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="company">
            Empresa
          </label>
          <input
            id="company"
            name="company"
            defaultValue={lead?.company ?? ""}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="source">
            Origen
          </label>
          <input
            id="source"
            name="source"
            placeholder="Web, referido, LinkedIn…"
            defaultValue={lead?.source ?? ""}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={lead?.email ?? ""}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="phone">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            defaultValue={lead?.phone ?? ""}
            className={inputClass}
          />
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
            defaultValue={
              lead?.valueCents != null ? lead.valueCents / 100 : ""
            }
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="notes">
          Notas
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={lead?.notes ?? ""}
          className={inputClass}
        />
      </div>

      <div>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
