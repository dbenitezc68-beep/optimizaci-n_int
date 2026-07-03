"use client";

import { inputClass } from "@/components/ui";
import { TASK_STATUS_OPTIONS } from "@/lib/domain";

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
        {TASK_STATUS_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </form>
  );
}
