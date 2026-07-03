"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import type { ProjectStatus } from "@/generated/prisma/client";

const STATUSES: ProjectStatus[] = [
  "PLANNED",
  "IN_PROGRESS",
  "PAUSED",
  "COMPLETED",
  "CANCELLED",
];

function projectDataFromForm(formData: FormData) {
  const budgetEuros = formData.get("budget");
  const startDate = String(formData.get("startDate") ?? "");
  const endDate = String(formData.get("endDate") ?? "");
  const status = String(formData.get("status") ?? "PLANNED") as ProjectStatus;

  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    status: STATUSES.includes(status) ? status : "PLANNED",
    budgetCents: budgetEuros ? Math.round(Number(budgetEuros) * 100) : null,
    startDate: startDate ? new Date(startDate) : null,
    endDate: endDate ? new Date(endDate) : null,
  };
}

export async function createProjectAction(formData: FormData) {
  await requireUser();
  const clientId = String(formData.get("clientId") ?? "");
  const data = projectDataFromForm(formData);

  if (!data.name || !clientId) {
    redirect(
      `/dashboard/projects/new?clientId=${clientId}&error=Indica nombre y cliente`
    );
  }

  const project = await prisma.project.create({
    data: { ...data, clientId },
  });

  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/clients/${clientId}`);
  redirect(`/dashboard/projects/${project.id}`);
}

export async function updateProjectAction(
  projectId: string,
  formData: FormData
) {
  await requireUser();
  const data = projectDataFromForm(formData);

  if (!data.name) {
    redirect(`/dashboard/projects/${projectId}/edit?error=El nombre es obligatorio`);
  }

  const project = await prisma.project.update({
    where: { id: projectId },
    data,
  });

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
  const status = String(formData.get("status") ?? "") as ProjectStatus;
  if (!STATUSES.includes(status)) return;

  await prisma.project.update({ where: { id: projectId }, data: { status } });
  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath("/dashboard");
}

export async function deleteProjectAction(formData: FormData) {
  await requireUser();
  const projectId = String(formData.get("projectId") ?? "");
  if (!projectId) return;

  const project = await prisma.project.delete({ where: { id: projectId } });
  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/clients/${project.clientId}`);
  redirect("/dashboard/projects");
}
