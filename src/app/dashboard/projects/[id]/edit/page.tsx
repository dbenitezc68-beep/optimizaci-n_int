import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, Card } from "@/components/ui";
import { ProjectForm } from "../../project-form";
import { updateProjectAction } from "../../actions";

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div>
      <PageHeader title={`Editar ${project.name}`} />
      <Card className="max-w-2xl">
        <ProjectForm
          action={updateProjectAction.bind(null, project.id)}
          project={project}
          error={error}
          submitLabel="Guardar cambios"
        />
      </Card>
    </div>
  );
}
