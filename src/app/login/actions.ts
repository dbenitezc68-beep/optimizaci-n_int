"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import {
  clearAttempts,
  isRateLimited,
  recordFailedAttempt,
} from "@/lib/rate-limit";

export type LoginResult = { error: string } | undefined;

// Comparar siempre contra un hash (aunque el email no exista) iguala el
// tiempo de respuesta y evita enumerar usuarios midiendo la latencia.
const dummyHash = bcrypt.hashSync("interemprex-timing-equalizer", 10);

export async function loginAction(
  _prevState: LoginResult,
  formData: FormData
): Promise<LoginResult> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Introduce email y contraseña." };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const rateKey = `${ip}:${email}`;

  if (isRateLimited(rateKey)) {
    return {
      error:
        "Demasiados intentos fallidos. Espera 15 minutos y vuelve a intentarlo.",
    };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  const valid = await bcrypt.compare(
    password,
    user?.passwordHash ?? dummyHash
  );

  if (!user || !valid) {
    recordFailedAttempt(rateKey);
    return { error: "Credenciales incorrectas." };
  }

  clearAttempts(rateKey);
  await createSession(user.id);
  redirect("/dashboard");
}
