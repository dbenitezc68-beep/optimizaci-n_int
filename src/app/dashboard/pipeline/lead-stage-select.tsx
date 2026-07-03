"use client";

import { inputClass } from "@/components/ui";

const STAGES: { value: string; label: string }[] = [
  { value: "NEW", label: "Nuevo" },
  { value: "CONTACTED", label: "Contactado" },
  { value: "PROPOSAL", label: "Propuesta" },
  { value: "NEGOTIATION", label: "Negociación" },
  { value: "WON", label: "Ganado" },
  { value: "LOST", label: "Perdido" },
];

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
        {STAGES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </form>
  );
}
