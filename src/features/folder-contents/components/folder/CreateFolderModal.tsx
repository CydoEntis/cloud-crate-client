import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ColorPicker } from "@/components/ColorPicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateFolder } from "../../hooks/folder/mutations/useCreateFolder";
import type { CreateFolder } from "../../types/folder/request/CreateFolder";
import { CreateFolderSchema } from "../../schemas/folder/CreateFolderSchema";

type CreateFolderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  crateId: string;
  parentFolderId?: string | null;
};

type FormValues = Pick<CreateFolder, "name" | "color">;

export function CreateFolderModal({ isOpen, onClose, crateId, parentFolderId }: CreateFolderModalProps) {
  const { mutateAsync: createFolder, isPending } = useCreateFolder();

  const form = useForm<FormValues>({
    resolver: zodResolver(CreateFolderSchema.pick({ name: true, color: true })),
    defaultValues: { name: "", color: "#4ade80" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createFolder({
        crateId,
        parentFolderId: parentFolderId ?? "root",
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
        if (!open) onClose(); // only close on user interaction
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
