import { crateService } from "@/features/crates/api/crateService";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/crates/$crateId/")({
  loader: async ({ params }) => {
    const crate = await crateService.getCrate(params.crateId);

    if (!crate) {
      throw new Error("Crate not found");
    }

    throw redirect({
      to: "/crates/$crateId/folders/$folderId",
      params: {
        crateId: params.crateId,
        folderId: crate.rootFolderId,
      },
    });
  },
});
