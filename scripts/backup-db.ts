import "dotenv/config";
import { existsSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

// Backup verificado de la base de datos SQLite (riesgo R6 del registro de
// priorización). Usa la API de backup online de SQLite: la copia es
// consistente aunque la app esté escribiendo en ese momento.

const RETAIN_COPIES = 14;

async function main() {
  const url = process.env.DATABASE_URL ?? "file:./dev.db";
  const dbPath = path.resolve(url.replace(/^file:/, ""));
  if (!existsSync(dbPath)) {
    console.error(`No existe la base de datos en ${dbPath}`);
    process.exitCode = 1;
    return;
  }

  const backupsDir = path.resolve("backups");
  mkdirSync(backupsDir, { recursive: true });

  const stamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .slice(0, 19);
  const dest = path.join(backupsDir, `dev-${stamp}.db`);

  const db = new Database(dbPath, { readonly: true, fileMustExist: true });
  try {
    await db.backup(dest);
  } finally {
    db.close();
  }

  // Un backup sin verificar no es un backup: comprobar integridad de la copia.
  const check = new Database(dest, { readonly: true });
  const result = check.pragma("integrity_check", { simple: true });
  check.close();
  if (result !== "ok") {
    unlinkSync(dest);
    console.error(`El backup NO pasó integrity_check (${result}) y se ha descartado.`);
    process.exitCode = 1;
    return;
  }

  const copies = readdirSync(backupsDir)
    .filter((f) => f.startsWith("dev-") && f.endsWith(".db"))
    .sort()
    .reverse();
  for (const old of copies.slice(RETAIN_COPIES)) {
    unlinkSync(path.join(backupsDir, old));
  }

  console.log(`Backup verificado (integrity_check ok): ${dest}`);
  console.log(
    `Copias retenidas: ${Math.min(copies.length, RETAIN_COPIES)} de un máximo de ${RETAIN_COPIES}.`
  );
  console.log(
    "Recuerda: la carpeta backups/ vive en este mismo disco. Copia periódicamente a otro medio (nube/disco externo)."
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
