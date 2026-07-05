import "server-only";
import { prisma } from "@/lib/prisma";
import { parseCsv } from "@/lib/csv";

// Importación masiva de clientes desde CSV. Cabeceras aceptadas en español
// o inglés, en cualquier orden; las columnas desconocidas se ignoran.

const HEADER_ALIASES: Record<string, keyof ClientRow> = {
  nombre: "name",
  name: "name",
  empresa: "company",
  company: "company",
  email: "email",
  correo: "email",
  telefono: "phone",
  teléfono: "phone",
  phone: "phone",
  pais: "country",
  país: "country",
  country: "country",
  notas: "notes",
  notes: "notes",
};

type ClientRow = {
  name: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  notes: string | null;
};

export type ClientImportResult =
  | { error: string }
  | { created: number; skippedExisting: number; invalid: number; totalRows: number };

export async function importClientsFromCsv(
  text: string
): Promise<ClientImportResult> {
  const rows = parseCsv(text);
  if (rows.length < 2) {
    return {
      error:
        "El CSV debe tener una fila de cabecera y al menos una fila de datos",
    };
  }

  const headers = rows[0].map(
    (h) => HEADER_ALIASES[h.trim().toLowerCase()] ?? null
  );
  if (!headers.includes("name")) {
    return {
      error:
        'Falta la columna "nombre" (o "name") en la cabecera del CSV',
    };
  }

  const parsed: ClientRow[] = rows.slice(1).map((cells) => {
    const record: ClientRow = {
      name: null,
      company: null,
      email: null,
      phone: null,
      country: null,
      notes: null,
    };
    headers.forEach((field, i) => {
      if (!field) return;
      const value = cells[i]?.trim() || null;
      record[field] = field === "email" ? value?.toLowerCase() ?? null : value;
    });
    return record;
  });

  const valid = parsed.filter(
    (r) => r.name && (!r.email || /.+@.+\..+/.test(r.email))
  );
  const invalid = parsed.length - valid.length;

  // Dedup contra la base y dentro del propio archivo (por email; las filas
  // sin email no se pueden deduplicar y siempre se crean).
  const emails = valid.map((r) => r.email).filter((e): e is string => !!e);
  const existing =
    emails.length > 0
      ? await prisma.client.findMany({
          where: { email: { in: emails } },
          select: { email: true },
        })
      : [];
  const seen = new Set(existing.map((c) => c.email));

  const toCreate: ClientRow[] = [];
  let skippedExisting = 0;
  for (const row of valid) {
    if (row.email) {
      if (seen.has(row.email)) {
        skippedExisting++;
        continue;
      }
      seen.add(row.email);
    }
    toCreate.push(row);
  }

  if (toCreate.length > 0) {
    await prisma.client.createMany({
      data: toCreate.map((r) => ({ ...r, name: r.name! })),
    });
  }

  return {
    created: toCreate.length,
    skippedExisting,
    invalid,
    totalRows: parsed.length,
  };
}
