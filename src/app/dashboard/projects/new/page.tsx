import { prisma } from "@/lib/prisma";
import { PageHeader, Card } from "@/components/ui";
import { ProjectForm } from "../project-form";
import { createProjectAction } from "../actions";

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; clientId?: string }>;
}) {
  const { error, clientId } = await searchParams;
  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div>
      <PageHeader
        title="Nuevo proceso"
        description="Un proceso es un proyecto o servicio en curso para un cliente."
      />
      <Card className="max-w-2xl">
        <ProjectForm
          action={createProjectAction}
          clients={clients}
          fixedClientId={clientId}
          error={error}
          submitLabel="Crear proceso"
        />
      </Card>
    </div>
  );
}
