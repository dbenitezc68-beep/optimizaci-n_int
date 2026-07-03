import { prisma } from "@/lib/prisma";
import { Card, PageHeader, Badge, Button, inputClass, labelClass } from "@/components/ui";
import { isStripeConfigured, isWebhookConfigured } from "@/lib/stripe";
import { changePasswordAction } from "./actions";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await searchParams;
  const configured = isStripeConfigured();
  const webhookConfigured = isWebhookConfigured();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const recentEvents = await prisma.webhookEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div>
      <PageHeader
        title="Ajustes"
        description="Cuenta, integración con Stripe y eventos recibidos."
      />

      <Card className="mb-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-200">
          Cambiar contraseña
        </h2>
        {error && (
          <p className="mb-4 rounded-lg border border-red-500/25 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300">
            {error}
          </p>
        )}
        {success && (
          <p className="mb-4 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2.5 text-sm text-emerald-300">
            {success}
          </p>
        )}
        <form action={changePasswordAction} className="max-w-md space-y-4">
          <div className="space-y-1.5">
            <label className={labelClass} htmlFor="currentPassword">
              Contraseña actual
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              required
              className={inputClass}
            />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass} htmlFor="newPassword">
              Nueva contraseña (mínimo 10 caracteres)
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={10}
              className={inputClass}
            />
          </div>
          <div className="space-y-1.5">
            <label className={labelClass} htmlFor="confirmPassword">
              Repite la nueva contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={10}
              className={inputClass}
            />
          </div>
          <p className="text-xs text-slate-500">
            Al cambiarla se cerrará la sesión en el resto de dispositivos.
          </p>
          <Button type="submit">Actualizar contraseña</Button>
        </form>
      </Card>

      <Card className="mb-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-200">
          Conexión con Stripe
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Clave secreta (STRIPE_SECRET_KEY)
            </div>
            <div className="mt-1">
              <Badge status={configured ? "PAID" : "FAILED"} />
              <span className="ml-2 text-sm text-slate-400">
                {configured ? "Configurada" : "No configurada"}
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Webhook secret (STRIPE_WEBHOOK_SECRET)
            </div>
            <div className="mt-1">
              <Badge status={webhookConfigured ? "PAID" : "FAILED"} />
              <span className="ml-2 text-sm text-slate-400">
                {webhookConfigured ? "Configurada" : "No configurada"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
          <p className="mb-2 font-medium text-slate-300">Cómo conectarlo:</p>
          <ol className="list-decimal space-y-1.5 pl-5">
            <li>
              Copia tu clave secreta desde el{" "}
              <span className="text-slate-300">Dashboard de Stripe → Developers → API keys</span>{" "}
              y pégala en <code className="text-sky-300">STRIPE_SECRET_KEY</code> dentro de{" "}
              <code className="text-sky-300">.env</code>.
            </li>
            <li>
              URL del webhook a registrar en Stripe:{" "}
              <code className="text-sky-300">{appUrl}/api/stripe/webhook</code>
            </li>
            <li>
              En local, usa el Stripe CLI:{" "}
              <code className="text-sky-300">
                stripe listen --forward-to {appUrl}/api/stripe/webhook
              </code>{" "}
              y copia el <code className="text-sky-300">whsec_...</code> que te
              da en <code className="text-sky-300">STRIPE_WEBHOOK_SECRET</code>.
            </li>
            <li>Reinicia el servidor (`npm run dev`) tras editar `.env`.</li>
          </ol>
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 text-sm font-semibold text-slate-200">
          Últimos eventos de Stripe recibidos
        </h2>
        {recentEvents.length === 0 ? (
          <p className="text-sm text-slate-500">
            Todavía no se ha recibido ningún webhook.
          </p>
        ) : (
          <div className="space-y-2">
            {recentEvents.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between border-b border-slate-800 py-2 text-sm last:border-0"
              >
                <span className="font-mono text-slate-300">{e.type}</span>
                <span className="text-xs text-slate-500">
                  {e.createdAt.toLocaleString("es-ES")}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
