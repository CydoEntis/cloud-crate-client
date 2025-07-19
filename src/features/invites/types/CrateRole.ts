export enum CrateRole {
  Owner = "Owner", // Full control, including deleting the crate
  Editor = "Editor", // Can upload/download/delete files
  Viewer = "Viewer", // Read-only access
}
