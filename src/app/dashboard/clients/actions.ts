"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

function clientDataFromForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    country: String(formData.get("country") ?? "").trim() || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
  };
}

export async function createClientAction(formData: FormData) {
  await requireUser();
  const data = clientDataFromForm(formData);
  if (!data.name) {
    redirect("/dashboard/clients/new?error=El nombre es obligatorio");
  }

  const client = await prisma.client.create({ data });
  revalidatePath("/dashboard/clients");
  redirect(`/dashboard/clients/${client.id}`);
}

export async function updateClientAction(clientId: string, formData: FormData) {
  await requireUser();
  const data = clientDataFromForm(formData);
  if (!data.name) {
    redirect(`/dashboard/clients/${clientId}/edit?error=El nombre es obligatorio`);
  }

  await prisma.client.update({ where: { id: clientId }, data });
  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${clientId}`);
  redirect(`/dashboard/clients/${clientId}`);
}

export async function deleteClientAction(formData: FormData) {
  await requireUser();
  const clientId = String(formData.get("clientId") ?? "");
  if (!clientId) return;

  await prisma.client.delete({ where: { id: clientId } });
  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
}
