"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import {
  optionalEmail,
  optionalText,
  parseForm,
  redirectWithError,
  requiredText,
  tryMutation,
} from "@/lib/forms";
import { importClientsFromCsv } from "@/lib/client-import";

const MAX_CSV_BYTES = 2 * 1024 * 1024;

const clientSchema = z.object({
  name: requiredText("El nombre es obligatorio"),
  company: optionalText,
  email: optionalEmail,
  phone: optionalText,
  country: optionalText,
  notes: optionalText,
});

export async function createClientAction(formData: FormData) {
  await requireUser();
  const parsed = parseForm(clientSchema, formData);
  if (!parsed.ok) redirectWithError("/dashboard/clients/new", parsed.error);

  const client = await tryMutation(
    () => prisma.client.create({ data: parsed.data }),
    "/dashboard/clients/new",
    "No se pudo crear el cliente. Inténtalo de nuevo."
  );

  revalidatePath("/dashboard/clients");
  revalidatePath("/dashboard");
  redirect(`/dashboard/clients/${client.id}`);
}

export async function updateClientAction(clientId: string, formData: FormData) {
  await requireUser();
  const parsed = parseForm(clientSchema, formData);
  if (!parsed.ok) {
    redirectWithError(`/dashboard/clients/${clientId}/edit`, parsed.error);
  }

  await tryMutation(
    () => prisma.client.update({ where: { id: clientId }, data: parsed.data }),
    `/dashboard/clients/${clientId}/edit`,
    "No se pudo guardar el cliente. Inténtalo de nuevo."
  );

  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${clientId}`);
  redirect(`/dashboard/clients/${clientId}`);
}

export async function importClientsAction(formData: FormData) {
  await requireUser();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    redirectWithError("/dashboard/clients/import", "Selecciona un archivo CSV");
  }
  if (file.size > MAX_CSV_BYTES) {
    redirectWithError(
      "/dashboard/clients/import",
      "El archivo supera el máximo de 2 MB"
    );
  }

  const text = await file.text();
  const result = await tryMutation(
    () => importClientsFromCsv(text),
    "/dashboard/clients/import",
    "No se pudo procesar el CSV. Comprueba el formato del archivo."
  );
  if ("error" in result) {
    redirectWithError("/dashboard/clients/import", result.error);
  }

  revalidatePath("/dashboard/clients");
  revalidatePath("/dashboard");
  redirect(
    `/dashboard/clients?imported=${result.created}&skipped=${result.skippedExisting}&invalid=${result.invalid}`
  );
}

export async function deleteClientAction(formData: FormData) {
  await requireUser();
  const clientId = String(formData.get("clientId") ?? "");
  if (!clientId) return;

  await tryMutation(
    () => prisma.client.delete({ where: { id: clientId } }),
    "/dashboard/clients",
    "No se pudo eliminar el cliente."
  );

  revalidatePath("/dashboard/clients");
  revalidatePath("/dashboard");
  redirect("/dashboard/clients");
}
