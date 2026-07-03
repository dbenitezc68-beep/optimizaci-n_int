import type {
  LeadStage,
  ProjectStatus,
  TaskStatus,
} from "@/generated/prisma/client";

// Única fuente de los valores de enum usados en formularios y validación.
// Las etiquetas visibles en español viven en components/ui.tsx (Badge).

export const PROJECT_STATUSES = [
  "PLANNED",
  "IN_PROGRESS",
  "PAUSED",
  "COMPLETED",
  "CANCELLED",
] as const satisfies readonly ProjectStatus[];

export const LEAD_STAGES = [
  "NEW",
  "CONTACTED",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
  "LOST",
] as const satisfies readonly LeadStage[];

export const TASK_STATUSES = [
  "TODO",
  "IN_PROGRESS",
  "DONE",
] as const satisfies readonly TaskStatus[];
