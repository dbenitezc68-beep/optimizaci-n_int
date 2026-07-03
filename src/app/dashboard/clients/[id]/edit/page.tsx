import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, Card } from "@/components/ui";
import { ClientForm } from "../../client-form";
import { updateClientAction } from "../../actions";

export default async function EditClientPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) notFound();

  return (
    <div>
      <PageHeader title={`Editar ${client.name}`} />
      <Card className="max-w-2xl">
        <ClientForm
          action={updateClientAction.bind(null, client.id)}
          client={client}
          error={error}
          submitLabel="Guardar cambios"
        />
      </Card>
    </div>
  );
}
