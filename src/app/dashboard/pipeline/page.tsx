import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { LEAD_STAGE_OPTIONS } from "@/lib/domain";
import { Badge, Card, PageHeader } from "@/components/ui";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";
import { LeadStageSelect } from "./lead-stage-select";
import {
  convertLeadToClientAction,
  deleteLeadAction,
  updateLeadStageAction,
} from "./actions";

export default async function PipelinePage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  const byStage = LEAD_STAGE_OPTIONS.map((stage) => ({
    ...stage,
    leads: leads.filter((l) => l.stage === stage.value),
  }));

  return (
    <div>
      <PageHeader
        title="Pipeline de ventas"
        description={`${leads.length} leads en total`}
        actions={
          <Link
            href="/dashboard/pipeline/new"
            className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-3.5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            + Nuevo lead
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {byStage.map((stage) => (
          <div key={stage.value} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <Badge status={stage.value} />
              <span className="text-xs text-slate-500">
                {stage.leads.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {stage.leads.map((lead) => (
                <Card key={lead.id} className="p-4">
                  <Link
                    href={`/dashboard/pipeline/${lead.id}`}
                    className="font-medium text-slate-100 hover:text-sky-300"
                  >
                    {lead.name}
                  </Link>
                  {lead.company && (
                    <div className="text-xs text-slate-500">
                      {lead.company}
                    </div>
                  )}
                  {lead.valueCents != null && (
                    <div className="mt-1 text-sm font-semibold text-sky-300">
                      {formatCents(lead.valueCents)}
                    </div>
                  )}

                  <div className="mt-3">
                    <LeadStageSelect
                      action={updateLeadStageAction.bind(null, lead.id)}
                      defaultValue={lead.stage}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    {!lead.convertedClientId && lead.stage !== "LOST" && (
                      <form action={convertLeadToClientAction}>
                        <input type="hidden" name="leadId" value={lead.id} />
                        <button
                          type="submit"
                          className="text-xs font-medium text-emerald-400 hover:text-emerald-300"
                        >
                          Convertir en cliente
                        </button>
                      </form>
                    )}
                    {lead.convertedClientId && (
                      <Link
                        href={`/dashboard/clients/${lead.convertedClientId}`}
                        className="text-xs font-medium text-sky-400 hover:text-sky-300"
                      >
                        Ver cliente →
                      </Link>
                    )}
                    <form action={deleteLeadAction}>
                      <input type="hidden" name="leadId" value={lead.id} />
                      <ConfirmSubmitButton confirmMessage="¿Eliminar este lead?">
                        <span className="text-xs">Eliminar</span>
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
