"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Resumen", icon: "📊" },
  { href: "/dashboard/clients", label: "Clientes", icon: "🏢" },
  { href: "/dashboard/projects", label: "Procesos", icon: "🗂️" },
  { href: "/dashboard/pipeline", label: "Pipeline", icon: "🎯" },
  { href: "/dashboard/tasks", label: "Tareas", icon: "✅" },
  { href: "/dashboard/payments", label: "Pagos", icon: "💳" },
  { href: "/dashboard/settings", label: "Ajustes", icon: "⚙️" },
];

export function Sidebar({
  userName,
}: {
  userName: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-none flex-col border-r border-slate-800 bg-slate-950">
      <div className="flex items-center gap-2 px-5 py-5 font-semibold tracking-wide text-slate-100">
        <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
        INTEREMPREX
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-sky-500/10 text-sky-300"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
              )}
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-3">
        <div className="mb-2 px-2 text-xs text-slate-500">
          Sesión iniciada como
          <div className="truncate text-sm font-medium text-slate-300">
            {userName}
          </div>
        </div>
        <form action="/api/logout" method="post">
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-red-300"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  );
}
