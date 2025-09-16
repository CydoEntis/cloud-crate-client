import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { ColorPicker } from "@/shared/components/ColorPicker";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useCreateFolder } from "../../api/folder.queries";
import type { CreateFolder } from "../../types/folder.types";
import { createFolderSchema } from "../../schemas/folder.schemas";

type CreateFolderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  crateId: string;
  parentFolderId: string;
};

type FormValues = Pick<CreateFolder, "name" | "color">;

export function CreateFolderModal({ isOpen, onClose, crateId, parentFolderId }: CreateFolderModalProps) {
  const { mutateAsync: createFolder, isPending } = useCreateFolder();

  const form = useForm<FormValues>({
    resolver: zodResolver(createFolderSchema.pick({ name: true, color: true })),
    defaultValues: { name: "", color: "#4ade80" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createFolder({
        crateId,
        parentFolderId: parentFolderId,
        name: data.name,
        color: data.color,
      });
      form.reset();
      onClose();
      toast.success("Folder created successfully");
    } catch (err: any) {
      toast.error(err?.message || "Failed to create folder");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md border-none shadow bg-card text-foreground">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
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
                    <Input {...field} disabled={isPending} />
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
                {isPending ? "Creating..." : "Create Folder"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFolderModal;
