import { PageHeader, Card } from "@/components/ui";
import { LeadForm } from "../lead-form";
import { createLeadAction } from "../actions";

export default async function NewLeadPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <PageHeader
        title="Nuevo lead"
        description="Registra una oportunidad comercial en el pipeline."
      />
      <Card className="max-w-xl">
        <LeadForm
          action={createLeadAction}
          error={error}
          submitLabel="Crear lead"
        />
      </Card>
    </div>
  );
}
