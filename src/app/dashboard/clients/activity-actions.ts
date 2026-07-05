"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { ACTIVITY_TYPES } from "@/lib/domain";
import {
  optionalDate,
  optionalText,
  parseForm,
  redirectWithError,
  requiredText,
  tryMutation,
} from "@/lib/forms";

const activitySchema = z.object({
  type: z.enum(ACTIVITY_TYPES).optional().default("NOTE").catch("NOTE"),
  title: requiredText("El título es obligatorio"),
  detail: optionalText,
  link: optionalText.refine(
    (v) => v === null || /^https?:\/\//i.test(v),
    { message: "El enlace debe empezar por http:// o https://" }
  ),
  date: optionalDate,
  clientId: requiredText("Falta el cliente"),
  projectId: optionalText,
});

// Las actividades se crean desde el expediente del cliente o desde el
// proceso: volver siempre a la página de origen (solo rutas internas).
function safeReturnTo(formData: FormData, clientId: string): string {
  const returnTo = String(formData.get("returnTo") ?? "");
  return returnTo.startsWith("/dashboard/")
    ? returnTo
    : `/dashboard/clients/${clientId}`;
}

function revalidateActivityPaths(clientId: string, projectId: string | null) {
  revalidatePath(`/dashboard/clients/${clientId}`);
  if (projectId) revalidatePath(`/dashboard/projects/${projectId}`);
}

export async function createActivityAction(formData: FormData) {
  await requireUser();
  const back = safeReturnTo(formData, String(formData.get("clientId") ?? ""));

  const parsed = parseForm(activitySchema, formData);
  if (!parsed.ok) redirectWithError(back, parsed.error);

  const { date, ...data } = parsed.data;
  await tryMutation(
    () =>
      prisma.activity.create({
        data: {
          ...data,
          date: date ?? new Date(),
          status: data.type === "INCIDENT" ? "OPEN" : null,
        },
      }),
    back,
    "No se pudo registrar la actividad. Inténtalo de nuevo."
  );

  revalidateActivityPaths(parsed.data.clientId, parsed.data.projectId);
  redirect(back);
}

export async function resolveIncidentAction(formData: FormData) {
  await requireUser();
  const activityId = String(formData.get("activityId") ?? "");
  if (!activityId) return;

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
  });
  if (!activity || activity.type !== "INCIDENT" || activity.status !== "OPEN") {
    return;
  }

  await tryMutation(
    () =>
      prisma.activity.update({
        where: { id: activityId },
        data: { status: "RESOLVED" },
      }),
    `/dashboard/clients/${activity.clientId}`,
    "No se pudo marcar la incidencia como resuelta."
  );

  revalidateActivityPaths(activity.clientId, activity.projectId);
}

export async function deleteActivityAction(formData: FormData) {
  await requireUser();
  const activityId = String(formData.get("activityId") ?? "");
  if (!activityId) return;

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
  });
  if (!activity) return;

  await tryMutation(
    () => prisma.activity.delete({ where: { id: activityId } }),
    `/dashboard/clients/${activity.clientId}`,
    "No se pudo eliminar la actividad."
  );

  revalidateActivityPaths(activity.clientId, activity.projectId);
}
