"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { LEAD_STAGES } from "@/lib/domain";
import {
  getLeadFinderDbPath,
  importLeadsFromLeadFinder,
  isLeadFinderConfigured,
  type LeadFinderScore,
} from "@/lib/leadfinder";
import {
  optionalEmail,
  optionalEurosToCents,
  optionalText,
  parseForm,
  redirectWithError,
  requiredText,
  tryMutation,
} from "@/lib/forms";

const leadSchema = z.object({
  name: requiredText("El nombre es obligatorio"),
  company: optionalText,
  email: optionalEmail,
  phone: optionalText,
  source: optionalText,
  notes: optionalText,
  value: optionalEurosToCents("El valor estimado debe ser un número mayor que 0"),
});

export async function createLeadAction(formData: FormData) {
  await requireUser();
  const parsed = parseForm(leadSchema, formData);
  if (!parsed.ok) redirectWithError("/dashboard/pipeline/new", parsed.error);

  const { value, ...data } = parsed.data;
  await tryMutation(
    () => prisma.lead.create({ data: { ...data, valueCents: value } }),
    "/dashboard/pipeline/new",
    "No se pudo crear el lead. Inténtalo de nuevo."
  );

  revalidatePath("/dashboard/pipeline");
  revalidatePath("/dashboard");
  redirect("/dashboard/pipeline");
}

export async function updateLeadAction(leadId: string, formData: FormData) {
  await requireUser();
  const parsed = parseForm(leadSchema, formData);
  if (!parsed.ok) {
    redirectWithError(`/dashboard/pipeline/${leadId}/edit`, parsed.error);
  }

  const { value, ...data } = parsed.data;
  await tryMutation(
    () =>
      prisma.lead.update({
        where: { id: leadId },
        data: { ...data, valueCents: value },
      }),
    `/dashboard/pipeline/${leadId}/edit`,
    "No se pudo guardar el lead. Inténtalo de nuevo."
  );

  revalidatePath("/dashboard/pipeline");
  revalidatePath(`/dashboard/pipeline/${leadId}`);
  revalidatePath("/dashboard");
  redirect(`/dashboard/pipeline/${leadId}`);
}

export async function updateLeadStageAction(
  leadId: string,
  formData: FormData
) {
  await requireUser();
  const stage = String(formData.get("stage") ?? "");
  if (!(LEAD_STAGES as readonly string[]).includes(stage)) return;

  await tryMutation(
    () =>
      prisma.lead.update({
        where: { id: leadId },
        data: { stage: stage as (typeof LEAD_STAGES)[number] },
      }),
    "/dashboard/pipeline",
    "No se pudo cambiar la etapa del lead."
  );

  revalidatePath("/dashboard/pipeline");
  revalidatePath(`/dashboard/pipeline/${leadId}`);
  revalidatePath("/dashboard");
}

export async function convertLeadToClientAction(formData: FormData) {
  await requireUser();
  const leadId = String(formData.get("leadId") ?? "");
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return;

  // Idempotente: si ya se convirtió (doble envío, doble clic), no crear
  // un cliente duplicado — ir a la ficha del cliente existente.
  if (lead.convertedClientId) {
    redirect(`/dashboard/clients/${lead.convertedClientId}`);
  }

  // Transacción: sin ella, un fallo al marcar el lead dejaría un cliente
  // huérfano y el lead volvería a convertirse en el siguiente intento.
  const client = await tryMutation(
    () =>
      prisma.$transaction(async (tx) => {
        const created = await tx.client.create({
          data: {
            name: lead.name,
            company: lead.company,
            email: lead.email,
            phone: lead.phone,
            notes: lead.notes,
          },
        });
        await tx.lead.update({
          where: { id: leadId },
          data: { stage: "WON", convertedClientId: created.id },
        });
        return created;
      }),
    "/dashboard/pipeline",
    "No se pudo convertir el lead en cliente. Inténtalo de nuevo."
  );

  revalidatePath("/dashboard/pipeline");
  revalidatePath("/dashboard/clients");
  revalidatePath("/dashboard");
  redirect(`/dashboard/clients/${client.id}`);
}

export async function importFromLeadFinderAction(formData: FormData) {
  await requireUser();

  if (!getLeadFinderDbPath()) {
    redirectWithError(
      "/dashboard/pipeline/import",
      "Configura LEADFINDER_DB_PATH en .env con la ruta al leadfinder.db"
    );
  }
  if (!isLeadFinderConfigured()) {
    redirectWithError(
      "/dashboard/pipeline/import",
      `No se encuentra el archivo indicado en LEADFINDER_DB_PATH: ${getLeadFinderDbPath()}`
    );
  }

  const minScore = String(formData.get("minScore") ?? "alta");
  if (!["alta", "media", "baja"].includes(minScore)) {
    redirectWithError("/dashboard/pipeline/import", "Nivel de interés no válido");
  }

  const result = await tryMutation(
    () => importLeadsFromLeadFinder(minScore as LeadFinderScore),
    "/dashboard/pipeline/import",
    "No se pudo importar desde LeadFinder. Comprueba que el archivo es una base de datos válida."
  );

  revalidatePath("/dashboard/pipeline");
  revalidatePath("/dashboard");
  redirect(
    `/dashboard/pipeline?imported=${result.imported}&skipped=${result.skipped}`
  );
}

export async function deleteLeadAction(formData: FormData) {
  await requireUser();
  const leadId = String(formData.get("leadId") ?? "");
  if (!leadId) return;

  await tryMutation(
    () => prisma.lead.delete({ where: { id: leadId } }),
    "/dashboard/pipeline",
    "No se pudo eliminar el lead."
  );

  revalidatePath("/dashboard/pipeline");
  revalidatePath("/dashboard");
  // Desde la ficha del lead, quedarse en la página borrada daría 404.
  redirect("/dashboard/pipeline");
}
