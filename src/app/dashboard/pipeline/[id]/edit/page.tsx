import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, Card } from "@/components/ui";
import { LeadForm } from "../../lead-form";
import { updateLeadAction } from "../../actions";

export default async function EditLeadPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();

  return (
    <div>
      <PageHeader title={`Editar ${lead.name}`} />
      <Card className="max-w-xl">
        <LeadForm
          action={updateLeadAction.bind(null, lead.id)}
          lead={lead}
          error={error}
          submitLabel="Guardar cambios"
        />
      </Card>
    </div>
  );
}
