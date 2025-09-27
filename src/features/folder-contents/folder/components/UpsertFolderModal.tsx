import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { createFolderSchema } from "../folderSchema";
import type { CreateFolder, CrateFolder } from "../folderTypes";
import { useCreateFolder, useUpdateFolder } from "../api/folderQueries";
import { ColorPicker } from "@/shared/components/color-picker/ColorPicker";

type UpsertFolderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  crateId: string;
  parentFolderId: string;
  folder?: CrateFolder;
};

type FormValues = Pick<CreateFolder, "name" | "color">;

export function UpsertFolderModal({ isOpen, onClose, crateId, parentFolderId, folder }: UpsertFolderModalProps) {
  const { mutateAsync: createFolder, isPending: isCreating } = useCreateFolder();
  const { mutateAsync: updateFolder, isPending: isUpdating } = useUpdateFolder();

  const isEditing = !!folder;
  const isPending = isCreating || isUpdating;

  const form = useForm<FormValues>({
    resolver: zodResolver(createFolderSchema.pick({ name: true, color: true })),
    defaultValues: {
      name: folder?.name || "",
      color: folder?.color || "#4ade80",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (folder) {
        form.reset({
          name: folder.name,
          color: folder.color || "#4ade80",
        });
      } else {
        form.reset({
          name: "",
          color: "#4ade80",
        });
      }
    }
  }, [folder, form, isOpen]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (isEditing && folder) {
        await updateFolder({
          crateId,
          folderId: folder.id,
          updateData: {
            newName: data.name,
            newColor: data.color,
          },
        });
      } else {
        await createFolder({
          crateId,
          parentFolderId: parentFolderId,
          name: data.name,
          color: data.color,
        });
      }

      form.reset();
      onClose();
    } catch (err: any) {
      toast.error(err?.message || `Failed to ${isEditing ? "update" : "create"} folder`);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          form.reset();
        }
      }}
    >
      <DialogContent className="sm:max-w-md border-none shadow bg-card text-foreground">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Folder" : "Create New Folder"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folder Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Enter folder name" autoFocus={isOpen} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <ColorPicker control={form.control} name={field.name} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 mt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? `${isEditing ? "Updating" : "Creating"}...` : `${isEditing ? "Update" : "Create"} Folder`}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UpsertFolderModal;
