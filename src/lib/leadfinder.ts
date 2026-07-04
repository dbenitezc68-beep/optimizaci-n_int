import "server-only";
import { existsSync } from "node:fs";
import Database from "better-sqlite3";
import { prisma } from "@/lib/prisma";
import type { LeadStage } from "@/generated/prisma/client";

// Importación de prospectos desde LeadFinder (motor de prospección propio,
// FastAPI + SQLite). Lectura SOLO-LECTURA de su base de datos; la clave
// estable "source:source_id" garantiza que reimportar nunca duplica.

export type LeadFinderScore = "alta" | "media" | "baja";

export function getLeadFinderDbPath(): string | null {
  const p = process.env.LEADFINDER_DB_PATH?.trim();
  return p || null;
}

export function isLeadFinderConfigured(): boolean {
  const p = getLeadFinderDbPath();
  return Boolean(p && existsSync(p));
}

type LeadFinderRow = {
  source: string;
  source_id: string;
  name: string;
  address: string | null;
  city: string | null;
  province: string | null;
  category: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  has_website: 0 | 1;
  has_social: 0 | 1;
  score: string;
  score_reasons: string | null;
  status: string;
  notes: string | null;
};

// Estados de LeadFinder que se consideran oportunidad activa; "descartado"
// y "cerrado" nunca se importan.
const STAGE_FROM_LEADFINDER_STATUS: Record<string, LeadStage> = {
  nuevo: "NEW",
  contactado: "CONTACTED",
  en_proceso: "CONTACTED",
};

function buildNotes(row: LeadFinderRow): string {
  const parts: string[] = [];
  if (row.category) parts.push(`Categoría: ${row.category}`);
  const location = [row.address, row.city, row.province]
    .filter(Boolean)
    .join(", ");
  if (location) parts.push(`Ubicación: ${location}`);
  parts.push(
    `Interés LeadFinder: ${row.score}${
      row.score_reasons ? ` — ${row.score_reasons}` : ""
    }`
  );
  parts.push(
    row.has_website ? `Web propia: ${row.website ?? "sí"}` : "Sin web propia"
  );
  parts.push(row.has_social ? "Con redes sociales" : "Sin redes sociales");
  if (row.notes) parts.push(`Notas en LeadFinder: ${row.notes}`);
  return parts.join("\n");
}

export async function importLeadsFromLeadFinder(minScore: LeadFinderScore) {
  const dbPath = getLeadFinderDbPath();
  if (!dbPath || !existsSync(dbPath)) {
    throw new Error("LEADFINDER_DB_PATH no apunta a un archivo existente");
  }

  const scores: LeadFinderScore[] =
    minScore === "alta"
      ? ["alta"]
      : minScore === "media"
        ? ["alta", "media"]
        : ["alta", "media", "baja"];

  const db = new Database(dbPath, { readonly: true, fileMustExist: true });
  let rows: LeadFinderRow[];
  try {
    rows = db
      .prepare(
        `SELECT source, source_id, name, address, city, province, category,
                phone, email, website, has_website, has_social,
                score, score_reasons, status, notes
         FROM leads
         WHERE status IN ('nuevo', 'contactado', 'en_proceso')
           AND score IN (${scores.map(() => "?").join(", ")})`
      )
      .all(...scores) as LeadFinderRow[];
  } finally {
    db.close();
  }

  if (rows.length === 0) {
    return { imported: 0, skipped: 0, candidates: 0 };
  }

  const keyOf = (r: LeadFinderRow) => `${r.source}:${r.source_id}`;
  const existing = await prisma.lead.findMany({
    where: { leadfinderKey: { in: rows.map(keyOf) } },
    select: { leadfinderKey: true },
  });
  const existingKeys = new Set(existing.map((l) => l.leadfinderKey));
  const toCreate = rows.filter((r) => !existingKeys.has(keyOf(r)));

  if (toCreate.length > 0) {
    await prisma.lead.createMany({
      data: toCreate.map((r) => ({
        name: r.name.trim(),
        email: r.email?.trim().toLowerCase() || null,
        phone: r.phone?.trim() || null,
        source: "LeadFinder",
        stage: STAGE_FROM_LEADFINDER_STATUS[r.status] ?? "NEW",
        notes: buildNotes(r),
        leadfinderKey: keyOf(r),
      })),
    });
  }

  return {
    imported: toCreate.length,
    skipped: rows.length - toCreate.length,
    candidates: rows.length,
  };
}
