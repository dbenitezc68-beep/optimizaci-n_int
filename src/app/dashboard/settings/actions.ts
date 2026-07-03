"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { createSession } from "@/lib/session";

const MIN_PASSWORD_LENGTH = 10;

export async function changePasswordAction(formData: FormData) {
  const user = await requireUser();

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    redirect(
      `/dashboard/settings?error=La nueva contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`
    );
  }
  if (newPassword !== confirmPassword) {
    redirect("/dashboard/settings?error=Las contraseñas nuevas no coinciden");
  }

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser || !(await bcrypt.compare(currentPassword, dbUser.passwordHash))) {
    redirect("/dashboard/settings?error=La contraseña actual no es correcta");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await bcrypt.hash(newPassword, 10),
      passwordChangedAt: new Date(),
    },
  });

  // Renovar la sesión actual: las demás sesiones (otros dispositivos o una
  // cookie robada) quedan invalidadas por passwordChangedAt.
  await createSession(user.id);

  redirect("/dashboard/settings?success=Contraseña actualizada correctamente");
}
