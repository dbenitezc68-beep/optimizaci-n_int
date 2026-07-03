import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@interemprex.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "interemprex2026";

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
  console.log("Cámbialo en cuanto inicies sesión.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
