"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { TASK_STATUSES } from "@/lib/domain";
import {
  optionalDate,
  optionalText,
  parseForm,
  redirectWithError,
  requiredText,
  tryMutation,
} from "@/lib/forms";

const taskSchema = z.object({
  title: requiredText("El título es obligatorio"),
  description: optionalText,
  dueDate: optionalDate,
  clientId: optionalText,
  projectId: optionalText,
});

export async function createTaskAction(formData: FormData) {
  await requireUser();
  const parsed = parseForm(taskSchema, formData);
  if (!parsed.ok) redirectWithError("/dashboard/tasks", parsed.error);

  await tryMutation(
    () => prisma.task.create({ data: parsed.data }),
    "/dashboard/tasks",
    "No se pudo crear la tarea. Inténtalo de nuevo."
  );

  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard");
  if (parsed.data.clientId) {
    revalidatePath(`/dashboard/clients/${parsed.data.clientId}`);
  }
  if (parsed.data.projectId) {
    revalidatePath(`/dashboard/projects/${parsed.data.projectId}`);
  }
}

export async function updateTaskStatusAction(
  taskId: string,
  formData: FormData
) {
  await requireUser();
  const status = String(formData.get("status") ?? "");
  if (!(TASK_STATUSES as readonly string[]).includes(status)) return;

  await tryMutation(
    () =>
      prisma.task.update({
        where: { id: taskId },
        data: { status: status as (typeof TASK_STATUSES)[number] },
      }),
    "/dashboard/tasks",
    "No se pudo cambiar el estado de la tarea."
  );

  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard");
}

export async function deleteTaskAction(formData: FormData) {
  await requireUser();
  const taskId = String(formData.get("taskId") ?? "");
  if (!taskId) return;

  await tryMutation(
    () => prisma.task.delete({ where: { id: taskId } }),
    "/dashboard/tasks",
    "No se pudo eliminar la tarea."
  );

  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard");
}
