import Link from "next/link";
import type { AttentionItem, AttentionSeverity } from "@/lib/attention";

const SEVERITY_DOT: Record<AttentionSeverity, string> = {
  1: "bg-red-400",
  2: "bg-amber-400",
  3: "bg-sky-400",
};

export function AttentionList({
  items,
  max,
}: {
  items: AttentionItem[];
  max?: number;
}) {
  const visible = max ? items.slice(0, max) : items;

  return (
    <>
      <ol className="space-y-2">
        {visible.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="flex items-start gap-3 rounded-lg border border-slate-800 px-3 py-2 text-sm hover:border-sky-700"
            >
              <span
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${SEVERITY_DOT[item.severity]}`}
              />
              <span className="flex-1">
                <span className="font-medium text-slate-200">{item.title}</span>
                <span className="ml-2 text-xs text-slate-500">
                  {item.detail}
                </span>
                <span className="mt-0.5 block text-xs text-emerald-400/90">
                  → {item.nextAction}
                </span>
              </span>
              <span className="shrink-0 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                {item.category}
              </span>
            </Link>
          </li>
        ))}
      </ol>
      {max && items.length > max && (
        <p className="mt-3 text-xs text-slate-500">
          Y {items.length - max} elementos más de seguimiento.
        </p>
      )}
    </>
  );
}
