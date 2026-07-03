"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import type { TaskStatus } from "@/generated/prisma/client";

const STATUSES: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

export async function createTaskAction(formData: FormData) {
  await requireUser();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  const dueDate = String(formData.get("dueDate") ?? "");
  const clientId = String(formData.get("clientId") ?? "") || null;
  const projectId = String(formData.get("projectId") ?? "") || null;

  await prisma.task.create({
    data: {
      title,
      description: String(formData.get("description") ?? "").trim() || null,
      dueDate: dueDate ? new Date(dueDate) : null,
      clientId,
      projectId,
    },
  });

  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard");
  if (clientId) revalidatePath(`/dashboard/clients/${clientId}`);
  if (projectId) revalidatePath(`/dashboard/projects/${projectId}`);
}

export async function updateTaskStatusAction(
  taskId: string,
  formData: FormData
) {
  await requireUser();
  const status = String(formData.get("status") ?? "") as TaskStatus;
  if (!STATUSES.includes(status)) return;

  await prisma.task.update({ where: { id: taskId }, data: { status } });
  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard");
}

export async function deleteTaskAction(formData: FormData) {
  await requireUser();
  const taskId = String(formData.get("taskId") ?? "");
  if (!taskId) return;

  await prisma.task.delete({ where: { id: taskId } });
  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard");
}
