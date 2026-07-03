"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import type { LeadStage } from "@/generated/prisma/client";

const STAGES: LeadStage[] = [
  "NEW",
  "CONTACTED",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
  "LOST",
];

export async function createLeadAction(formData: FormData) {
  await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    redirect("/dashboard/pipeline/new?error=El nombre es obligatorio");
  }

  const valueEuros = formData.get("value");

  await prisma.lead.create({
    data: {
      name,
      company: String(formData.get("company") ?? "").trim() || null,
      email: String(formData.get("email") ?? "").trim() || null,
      phone: String(formData.get("phone") ?? "").trim() || null,
      source: String(formData.get("source") ?? "").trim() || null,
      notes: String(formData.get("notes") ?? "").trim() || null,
      valueCents: valueEuros ? Math.round(Number(valueEuros) * 100) : null,
    },
  });

  revalidatePath("/dashboard/pipeline");
  revalidatePath("/dashboard");
  redirect("/dashboard/pipeline");
}

export async function updateLeadStageAction(
  leadId: string,
  formData: FormData
) {
  await requireUser();
  const stage = String(formData.get("stage") ?? "") as LeadStage;
  if (!STAGES.includes(stage)) return;

  await prisma.lead.update({ where: { id: leadId }, data: { stage } });
  revalidatePath("/dashboard/pipeline");
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

  const client = await prisma.client.create({
    data: {
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      notes: lead.notes,
    },
  });

  await prisma.lead.update({
    where: { id: leadId },
    data: { stage: "WON", convertedClientId: client.id },
  });

  revalidatePath("/dashboard/pipeline");
  revalidatePath("/dashboard/clients");
  redirect(`/dashboard/clients/${client.id}`);
}

export async function deleteLeadAction(formData: FormData) {
  await requireUser();
  const leadId = String(formData.get("leadId") ?? "");
  if (!leadId) return;

  await prisma.lead.delete({ where: { id: leadId } });
  revalidatePath("/dashboard/pipeline");
}
