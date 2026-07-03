import { PageHeader, Card } from "@/components/ui";
import { ClientForm } from "../client-form";
import { createClientAction } from "../actions";

export default async function NewClientPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <PageHeader
        title="Nuevo cliente"
        description="Crea una ficha de cliente para asociarle procesos, tareas y pagos."
      />
      <Card className="max-w-2xl">
        <ClientForm
          action={createClientAction}
          error={error}
          submitLabel="Crear cliente"
        />
      </Card>
    </div>
  );
}
