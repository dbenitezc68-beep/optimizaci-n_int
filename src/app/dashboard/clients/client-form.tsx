import { inputClass, labelClass, Button } from "@/components/ui";
import type { Client } from "@/generated/prisma/client";

export function ClientForm({
  action,
  client,
  error,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  client?: Pick<
    Client,
    "name" | "company" | "email" | "phone" | "country" | "notes"
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="name">
            Nombre *
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={client?.name}
            className={inputClass}
            placeholder="Nombre del cliente o contacto"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="company">
            Empresa
          </label>
          <input
            id="company"
            name="company"
            defaultValue={client?.company ?? ""}
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
            defaultValue={client?.email ?? ""}
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
            defaultValue={client?.phone ?? ""}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="country">
            País
          </label>
          <input
            id="country"
            name="country"
            defaultValue={client?.country ?? ""}
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
          defaultValue={client?.notes ?? ""}
          className={inputClass}
        />
      </div>

      <div>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
