"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { PROJECT_STATUSES } from "@/lib/domain";
import {
  optionalDate,
  optionalEurosToCents,
  optionalText,
  parseForm,
  redirectWithError,
  requiredText,
  tryMutation,
} from "@/lib/forms";

const projectSchema = z.object({
  name: requiredText("El nombre es obligatorio"),
  description: optionalText,
  status: z.enum(PROJECT_STATUSES).optional().default("PLANNED").catch("PLANNED"),
  budget: optionalEurosToCents("El presupuesto debe ser un número mayor que 0"),
  startDate: optionalDate,
  endDate: optionalDate,
});

const createProjectSchema = projectSchema.extend({
  clientId: requiredText("Indica el cliente"),
});

export async function createProjectAction(formData: FormData) {
  await requireUser();
  const parsed = parseForm(createProjectSchema, formData);
  if (!parsed.ok) {
    const clientId = String(formData.get("clientId") ?? "");
    redirectWithError(
      `/dashboard/projects/new?clientId=${encodeURIComponent(clientId)}`,
      parsed.error
    );
  }

  const { budget, ...data } = parsed.data;
  const project = await tryMutation(
    () => prisma.project.create({ data: { ...data, budgetCents: budget } }),
    `/dashboard/projects/new?clientId=${encodeURIComponent(parsed.data.clientId)}`,
    "No se pudo crear el proceso. Inténtalo de nuevo."
  );

  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/clients/${parsed.data.clientId}`);
  redirect(`/dashboard/projects/${project.id}`);
}

export async function updateProjectAction(
  projectId: string,
  formData: FormData
) {
  await requireUser();
  const parsed = parseForm(projectSchema, formData);
  if (!parsed.ok) {
    redirectWithError(`/dashboard/projects/${projectId}/edit`, parsed.error);
  }

  const { budget, ...data } = parsed.data;
  const project = await tryMutation(
    () =>
      prisma.project.update({
        where: { id: projectId },
        data: { ...data, budgetCents: budget },
      }),
    `/dashboard/projects/${projectId}/edit`,
    "No se pudo guardar el proceso. Inténtalo de nuevo."
  );

  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/dashboard/clients/${project.clientId}`);
  redirect(`/dashboard/projects/${projectId}`);
}

export async function updateProjectStatusAction(
  projectId: string,
  formData: FormData
) {
  await requireUser();
  const status = String(formData.get("status") ?? "");
  if (!(PROJECT_STATUSES as readonly string[]).includes(status)) return;

  await tryMutation(
    () =>
      prisma.project.update({
        where: { id: projectId },
        data: { status: status as (typeof PROJECT_STATUSES)[number] },
      }),
    "/dashboard/projects",
    "No se pudo cambiar el estado del proceso."
  );

  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath("/dashboard");
}

export async function deleteProjectAction(formData: FormData) {
  await requireUser();
  const projectId = String(formData.get("projectId") ?? "");
  if (!projectId) return;

  const project = await tryMutation(
    () => prisma.project.delete({ where: { id: projectId } }),
    "/dashboard/projects",
    "No se pudo eliminar el proceso."
  );

  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/clients/${project.clientId}`);
  redirect("/dashboard/projects");
}
