import type {
  ActivityStatus,
  ActivityType,
  LeadStage,
  ProjectStatus,
  TaskStatus,
} from "@/generated/prisma/client";

// Única fuente de los valores de enum y sus etiquetas en español.
// Formularios, selects, badges y validación consumen todo de aquí.

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

export const ACTIVITY_TYPES = [
  "NOTE",
  "CALL",
  "MEETING",
  "INCIDENT",
  "DELIVERABLE",
] as const satisfies readonly ActivityType[];

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  PLANNED: "Planificado",
  IN_PROGRESS: "En curso",
  PAUSED: "Pausado",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};

export const LEAD_STAGE_LABELS: Record<LeadStage, string> = {
  NEW: "Nuevo",
  CONTACTED: "Contactado",
  PROPOSAL: "Propuesta",
  NEGOTIATION: "Negociación",
  WON: "Ganado",
  LOST: "Perdido",
};

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "Pendiente",
  IN_PROGRESS: "En curso",
  DONE: "Hecho",
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendiente",
  PAID: "Pagado",
  FAILED: "Fallido",
  REFUNDED: "Reembolsado",
};

export const SUBSCRIPTION_STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Activa",
  TRIALING: "Prueba",
  PAST_DUE: "Impago",
  CANCELED: "Cancelada",
  INCOMPLETE: "Incompleta",
};

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  NOTE: "Nota",
  CALL: "Llamada",
  MEETING: "Reunión",
  INCIDENT: "Incidencia",
  DELIVERABLE: "Entregable",
};

export const ACTIVITY_STATUS_LABELS: Record<ActivityStatus, string> = {
  OPEN: "Abierta",
  RESOLVED: "Resuelta",
};

const toOptions = <T extends string>(
  values: readonly T[],
  labels: Record<T, string>
) => values.map((value) => ({ value, label: labels[value] }));

export const PROJECT_STATUS_OPTIONS = toOptions(
  PROJECT_STATUSES,
  PROJECT_STATUS_LABELS
);
export const LEAD_STAGE_OPTIONS = toOptions(LEAD_STAGES, LEAD_STAGE_LABELS);
export const TASK_STATUS_OPTIONS = toOptions(TASK_STATUSES, TASK_STATUS_LABELS);
export const ACTIVITY_TYPE_OPTIONS = toOptions(
  ACTIVITY_TYPES,
  ACTIVITY_TYPE_LABELS
);
