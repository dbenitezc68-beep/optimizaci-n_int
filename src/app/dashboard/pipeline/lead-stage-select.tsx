"use client";

import { inputClass } from "@/components/ui";
import { LEAD_STAGE_OPTIONS } from "@/lib/domain";

export function LeadStageSelect({
  action,
  defaultValue,
}: {
  action: (formData: FormData) => void;
  defaultValue: string;
}) {
  return (
    <form action={action}>
      <select
        name="stage"
        defaultValue={defaultValue}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className={`${inputClass} py-1.5 text-xs`}
      >
        {LEAD_STAGE_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </form>
  );
}
