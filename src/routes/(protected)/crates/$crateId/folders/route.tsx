import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { createFileRoute } from "@tanstack/react-router";

const folderSearchSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
});

export const Route = createFileRoute("/(protected)/crates/$crateId/folders")({
  validateSearch: zodValidator(folderSearchSchema),
  component: FoldersLayout,
});

function FoldersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
