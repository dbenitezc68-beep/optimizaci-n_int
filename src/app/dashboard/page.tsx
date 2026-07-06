import Link from "next/link";
import { getDashboardOverview } from "@/lib/metrics";
import { getAttentionItems } from "@/lib/attention";
import { formatCents, formatDate } from "@/lib/money";
import { Badge, Card, PageHeader, StatCard } from "@/components/ui";
import { RevenueChart } from "@/components/revenue-chart";
import { AttentionList } from "@/components/attention-list";

const MAX_ATTENTION_ITEMS = 15;

export default async function DashboardOverviewPage() {
  const [data, attention] = await Promise.all([
    getDashboardOverview(),
    getAttentionItems(),
  ]);

  return (
    <div>
      <PageHeader
        title="Resumen"
        description="Vista general de procesos, pipeline y pagos de INTEREMPREX."
      />

      <Card className="mb-6">
        <h2 className="mb-3 text-sm font-semibold text-slate-200">
          Requiere tu atención
          {attention.length > 0 && (
            <span className="ml-2 rounded-full bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-300">
              {attention.length}
            </span>
          )}
        </h2>
        {attention.length === 0 ? (
          <p className="text-sm text-slate-500">
            Nada requiere atención hoy. Todo en orden.
          </p>
        ) : (
          <AttentionList items={attention} max={MAX_ATTENTION_ITEMS} />
        )}
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="MRR"
          value={formatCents(data.mrrCents)}
          hint="Ingreso recurrente mensual estimado"
        />
        <StatCard
          label="Ingresos este mes"
          value={formatCents(data.revenueThisMonthCents)}
          hint="Pagos cobrados en el mes actual"
        />
        <StatCard
          label="Clientes"
          value={String(data.activeClients)}
          hint="Total de clientes registrados"
        />
        <StatCard
          label="Tareas pendientes"
          value={String(data.pendingTasks)}
          hint={`${data.openLeads} leads abiertos en pipeline`}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-1 text-sm font-semibold text-slate-200">
            Ingresos últimos 6 meses
          </h2>
          <p className="mb-2 text-xs text-slate-500">
            Pagos cobrados por mes (Stripe y manuales)
          </p>
          <RevenueChart data={data.monthlyRevenue} />
        </Card>

        <Card>
          <h2 className="mb-3 text-sm font-semibold text-slate-200">
            Pipeline de ventas
          </h2>
          <div className="space-y-2">
            {data.leadsByStage.length === 0 && (
              <p className="text-sm text-slate-500">Sin leads todavía.</p>
            )}
            {data.leadsByStage.map((row) => (
              <div
                key={row.stage}
                className="flex items-center justify-between text-sm"
              >
                <Badge status={row.stage} />
                <span className="font-medium text-slate-300">
                  {row._count._all}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/dashboard/pipeline"
            className="mt-4 inline-block text-sm font-medium text-sky-400 hover:text-sky-300"
          >
            Ver pipeline completo →
          </Link>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200">
              Pagos recientes
            </h2>
            <Link
              href="/dashboard/payments"
              className="text-sm font-medium text-sky-400 hover:text-sky-300"
            >
              Ver todos →
            </Link>
          </div>
          {data.recentPayments.length === 0 ? (
            <p className="text-sm text-slate-500">
              Sin pagos sincronizados todavía. Conecta Stripe en Ajustes.
            </p>
          ) : (
            <div className="space-y-2">
              {data.recentPayments.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between border-b border-slate-800 py-2 text-sm last:border-0"
                >
                  <div>
                    <div className="font-medium text-slate-200">
                      {p.client?.name ?? "Sin cliente"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {p.description ?? "Pago"} · {formatDate(p.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-200">
                      {formatCents(p.amountCents, p.currency.toUpperCase())}
                    </span>
                    <Badge status={p.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="mb-3 text-sm font-semibold text-slate-200">
            Procesos por estado
          </h2>
          <div className="space-y-2">
            {data.projectsByStatus.length === 0 && (
              <p className="text-sm text-slate-500">Sin procesos todavía.</p>
            )}
            {data.projectsByStatus.map((row) => (
              <div
                key={row.status}
                className="flex items-center justify-between text-sm"
              >
                <Badge status={row.status} />
                <span className="font-medium text-slate-300">
                  {row._count._all}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/dashboard/projects"
            className="mt-4 inline-block text-sm font-medium text-sky-400 hover:text-sky-300"
          >
            Ver procesos →
          </Link>
        </Card>
      </div>
    </div>
  );
}
