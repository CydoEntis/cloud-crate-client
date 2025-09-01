import type { useNavigate } from "@tanstack/react-router";
import { getFolderPath } from "./getFolderPath";

export function navigateToFolder(navigate: ReturnType<typeof useNavigate>, crateId: string, folderId: string | null) {
  navigate({ to: getFolderPath(crateId, folderId) });
}
