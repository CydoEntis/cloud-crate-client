import { createFileRoute } from "@tanstack/react-router";
import { FolderContentsView } from "@/features/files";

export const Route = createFileRoute("/(protected)/crates/$crateId/")({
  component: CrateIndex,
});

function CrateIndex() {
  const { crateId } = Route.useParams();

  return (
    <section>
      <FolderContentsView crateId={crateId} folderId={null} />
    </section>
  );
}
