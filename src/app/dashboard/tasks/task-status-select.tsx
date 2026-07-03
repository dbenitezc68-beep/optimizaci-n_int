"use client";

import { inputClass } from "@/components/ui";

const STATUSES = [
  { value: "TODO", label: "Pendiente" },
  { value: "IN_PROGRESS", label: "En curso" },
  { value: "DONE", label: "Hecho" },
];

export function TaskStatusSelect({
  action,
  defaultValue,
}: {
  action: (formData: FormData) => void;
  defaultValue: string;
}) {
  return (
    <form action={action}>
      <select
        name="status"
        defaultValue={defaultValue}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className={`${inputClass} py-1.5 text-xs`}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </form>
  );
}
