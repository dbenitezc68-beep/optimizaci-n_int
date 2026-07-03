import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { Badge, Card, PageHeader } from "@/components/ui";
import { ConfirmSubmitButton } from "@/components/confirm-submit-button";
import { LeadStageSelect } from "../lead-stage-select";
import {
  convertLeadToClientAction,
  deleteLeadAction,
  updateLeadStageAction,
} from "../actions";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm text-slate-200">{children}</div>
    </div>
  );
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { convertedClient: { select: { id: true, name: true } } },
  });
  if (!lead) notFound();

  return (
    <div>
      <PageHeader
        title={lead.name}
        description={[lead.company, lead.source && `Origen: ${lead.source}`]
          .filter(Boolean)
          .join(" · ")}
        actions={
          <>
            <Badge status={lead.stage} />
            <Link
              href={`/dashboard/pipeline/${lead.id}/edit`}
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:border-sky-500 hover:text-sky-300"
            >
              Editar
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-slate-200">
            Datos del lead
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Email">
              {lead.email ? (
                <a
                  href={`mailto:${lead.email}`}
                  className="text-sky-400 hover:text-sky-300"
                >
                  {lead.email}
                </a>
              ) : (
                <span className="text-slate-500">—</span>
              )}
            </Field>
            <Field label="Teléfono">
              {lead.phone ? (
                <a
                  href={`tel:${lead.phone}`}
                  className="text-sky-400 hover:text-sky-300"
                >
                  {lead.phone}
                </a>
              ) : (
                <span className="text-slate-500">—</span>
              )}
            </Field>
            <Field label="Empresa">
              {lead.company ?? <span className="text-slate-500">—</span>}
            </Field>
            <Field label="Origen">
              {lead.source ?? <span className="text-slate-500">—</span>}
            </Field>
            <Field label="Valor estimado">
              {lead.valueCents != null ? (
                <span className="font-semibold text-sky-300">
                  {formatCents(lead.valueCents)}
                </span>
              ) : (
                <span className="text-slate-500">—</span>
              )}
            </Field>
            <Field label="Creado">
              {lead.createdAt.toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Field>
          </div>

          {lead.notes && (
            <div className="mt-5 border-t border-slate-800 pt-4">
              <Field label="Notas">
                <p className="whitespace-pre-wrap">{lead.notes}</p>
              </Field>
            </div>
          )}
        </Card>

        <Card>
          <h2 className="mb-4 text-sm font-semibold text-slate-200">
            Etapa y acciones
          </h2>
          <div className="flex flex-col gap-4">
            <LeadStageSelect
              action={updateLeadStageAction.bind(null, lead.id)}
              defaultValue={lead.stage}
            />

            {lead.convertedClient ? (
              <Link
                href={`/dashboard/clients/${lead.convertedClient.id}`}
                className="text-sm font-medium text-sky-400 hover:text-sky-300"
              >
                Convertido en cliente: {lead.convertedClient.name} →
              </Link>
            ) : (
              lead.stage !== "LOST" && (
                <form action={convertLeadToClientAction}>
                  <input type="hidden" name="leadId" value={lead.id} />
                  <button
                    type="submit"
                    className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
                  >
                    Convertir en cliente
                  </button>
                </form>
              )
            )}

            <form action={deleteLeadAction} className="border-t border-slate-800 pt-4">
              <input type="hidden" name="leadId" value={lead.id} />
              <ConfirmSubmitButton confirmMessage="¿Eliminar este lead?">
                Eliminar lead
              </ConfirmSubmitButton>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
