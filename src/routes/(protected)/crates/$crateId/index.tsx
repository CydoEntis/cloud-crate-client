import { FolderContentsView } from "@/features/files";

export function CrateDetailPage() {
  const { crateId } = Route.useParams();
  return <FolderContentsView crateId={crateId} folderId={null} />;
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/crates/$crateId/")({
  component: CrateDetailPage,
});
