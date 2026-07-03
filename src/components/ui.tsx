import type { ReactNode } from "react";
import clsx from "clsx";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card>
      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-2xl font-bold text-white">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </Card>
  );
}

const BADGE_STYLES: Record<string, string> = {
  // project status
  PLANNED: "bg-slate-700/40 text-slate-300",
  IN_PROGRESS: "bg-sky-500/15 text-sky-300",
  PAUSED: "bg-amber-500/15 text-amber-300",
  COMPLETED: "bg-emerald-500/15 text-emerald-300",
  CANCELLED: "bg-red-500/15 text-red-300",
  // task status
  TODO: "bg-slate-700/40 text-slate-300",
  DONE: "bg-emerald-500/15 text-emerald-300",
  // lead stage
  NEW: "bg-slate-700/40 text-slate-300",
  CONTACTED: "bg-sky-500/15 text-sky-300",
  PROPOSAL: "bg-violet-500/15 text-violet-300",
  NEGOTIATION: "bg-amber-500/15 text-amber-300",
  WON: "bg-emerald-500/15 text-emerald-300",
  LOST: "bg-red-500/15 text-red-300",
  // payment / subscription status
  PENDING: "bg-amber-500/15 text-amber-300",
  PAID: "bg-emerald-500/15 text-emerald-300",
  FAILED: "bg-red-500/15 text-red-300",
  REFUNDED: "bg-slate-700/40 text-slate-300",
  ACTIVE: "bg-emerald-500/15 text-emerald-300",
  TRIALING: "bg-sky-500/15 text-sky-300",
  PAST_DUE: "bg-amber-500/15 text-amber-300",
  CANCELED: "bg-red-500/15 text-red-300",
  INCOMPLETE: "bg-slate-700/40 text-slate-300",
};

const STATUS_LABELS: Record<string, string> = {
  PLANNED: "Planificado",
  IN_PROGRESS: "En curso",
  PAUSED: "Pausado",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
  TODO: "Pendiente",
  DONE: "Hecho",
  NEW: "Nuevo",
  CONTACTED: "Contactado",
  PROPOSAL: "Propuesta",
  NEGOTIATION: "Negociación",
  WON: "Ganado",
  LOST: "Perdido",
  PENDING: "Pendiente",
  PAID: "Pagado",
  FAILED: "Fallido",
  REFUNDED: "Reembolsado",
  ACTIVE: "Activa",
  TRIALING: "Prueba",
  PAST_DUE: "Impago",
  CANCELED: "Cancelada",
  INCOMPLETE: "Incompleta",
};

export function Badge({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        BADGE_STYLES[status] ?? "bg-slate-700/40 text-slate-300"
      )}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition disabled:opacity-60",
        variant === "primary" &&
          "bg-sky-500 text-slate-950 hover:bg-cyan-400",
        variant === "ghost" &&
          "border border-slate-700 text-slate-300 hover:border-sky-500 hover:text-sky-300",
        variant === "danger" && "bg-red-500/15 text-red-300 hover:bg-red-500/25",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export const inputClass =
  "w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500";

export const labelClass = "text-sm font-medium text-slate-300";
