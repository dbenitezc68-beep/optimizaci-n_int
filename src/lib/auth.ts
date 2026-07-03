import "server-only";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

// El iat del JWT tiene precisión de segundos: sin este margen, la sesión
// creada justo después de cambiar la contraseña podría quedar invalidada.
const PASSWORD_CHANGE_SLACK_MS = 2000;

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      passwordChangedAt: true,
    },
  });
  if (!user) return null;

  // Cambiar la contraseña invalida las sesiones emitidas antes del cambio.
  if (
    user.passwordChangedAt &&
    user.passwordChangedAt.getTime() - session.issuedAt.getTime() >
      PASSWORD_CHANGE_SLACK_MS
  ) {
    return null;
  }

  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}
