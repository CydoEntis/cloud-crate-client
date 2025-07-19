import type z from "zod";
import type { crateInviteFormSchema } from "../schemas";

export type CrateInviteForm = z.infer<typeof crateInviteFormSchema>;

export type CrateInviteRequest = {
  email: string;
  role: CrateRole;
  expiresAt: Date;
};

export enum CrateRole {
  Owner = "Owner", // Full control, including deleting the crate
  Editor = "Editor", // Can upload/download/delete files
  Viewer = "Viewer", // Read-only access
}
