import "server-only";
import { redirect } from "next/navigation";
import { z } from "zod";

// Helpers compartidos por todas las server actions: parseo de FormData con
// zod (mensajes en español), redirección con errores codificados y ejecución
// de mutaciones con manejo uniforme de fallos de Prisma/Stripe.

export const requiredText = (message: string) =>
  z
    .string()
    .optional()
    .default("")
    .transform((v) => v.trim())
    .refine((v) => v.length > 0, { message });

export const optionalText = z
  .string()
  .optional()
  .transform((v) => v?.trim() || null);

export const optionalEmail = optionalText.refine(
  (v) => v === null || /.+@.+\..+/.test(v),
  { message: "El email no es válido" }
);

export const requiredEurosToCents = (message: string) =>
  z
    .string()
    .optional()
    .default("")
    .transform((v) => v.trim())
    .refine((v) => v !== "" && Number.isFinite(Number(v)) && Number(v) > 0, {
      message,
    })
    .transform((v) => Math.round(Number(v) * 100));

export const optionalEurosToCents = (message: string) =>
  z
    .string()
    .optional()
    .default("")
    .transform((v) => v.trim())
    .refine((v) => v === "" || (Number.isFinite(Number(v)) && Number(v) > 0), {
      message,
    })
    .transform((v) => (v === "" ? null : Math.round(Number(v) * 100)));

export const optionalDate = z
  .string()
  .optional()
  .default("")
  .transform((v) => v.trim())
  .refine((v) => v === "" || !Number.isNaN(Date.parse(v)), {
    message: "La fecha no es válida",
  })
  .transform((v) => (v === "" ? null : new Date(v)));

export function parseForm<S extends z.ZodType>(
  schema: S,
  formData: FormData
): { ok: true; data: z.output<S> } | { ok: false; error: string } {
  const raw: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") raw[key] = value;
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    return {
      ok: false,
      error: result.error.issues[0]?.message ?? "Los datos no son válidos",
    };
  }
  return { ok: true, data: result.data };
}

export function redirectWithError(path: string, error: string): never {
  const separator = path.includes("?") ? "&" : "?";
  redirect(`${path}${separator}error=${encodeURIComponent(error)}`);
}

// redirect()/notFound() funcionan lanzando una excepción de control de flujo
// que NO debe tratarse como fallo de la mutación.
function isNextControlFlowError(err: unknown): boolean {
  if (typeof err !== "object" || err === null || !("digest" in err)) {
    return false;
  }
  const digest = (err as { digest?: unknown }).digest;
  return (
    typeof digest === "string" &&
    (digest.startsWith("NEXT_REDIRECT") || digest === "NEXT_NOT_FOUND")
  );
}

export async function tryMutation<T>(
  fn: () => Promise<T>,
  errorPath: string,
  message: string
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (isNextControlFlowError(err)) throw err;
    console.error(`[action] ${message}`, err);
    redirectWithError(errorPath, message);
  }
}
