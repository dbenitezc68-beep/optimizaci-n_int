import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@interemprex.com";
  // Sin SEED_ADMIN_PASSWORD se genera una contraseña aleatoria (se imprime
  // una única vez): nunca debe existir una credencial por defecto conocida.
  const password =
    process.env.SEED_ADMIN_PASSWORD ?? randomBytes(9).toString("base64url");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`El usuario ${email} ya existe, no se crea de nuevo.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name: "Admin INTEREMPREX",
      email,
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Usuario admin creado: ${email} / ${password}`);
  console.log(
    "Guarda esta contraseña ahora (no se volverá a mostrar) o cámbiala desde Ajustes."
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
