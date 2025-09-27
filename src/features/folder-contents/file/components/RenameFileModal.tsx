import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import type { CrateFile } from "../fileTypes";
import { useUpdateFile } from "../api/fileQueries";
import { renameFileSchema } from "../fileSchema";

type FormValues = z.infer<typeof renameFileSchema>;

interface RenameFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  crateId: string;
  file: CrateFile | null;
}

export function RenameFileModal({ isOpen, onClose, crateId, file }: RenameFileModalProps) {
  const { mutateAsync: updateFile, isPending } = useUpdateFile();

  const form = useForm<FormValues>({
    resolver: zodResolver(renameFileSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (isOpen && file) {
      const nameWithoutExt = file.name.includes(".") ? file.name.substring(0, file.name.lastIndexOf(".")) : file.name;

      form.reset({
        name: nameWithoutExt,
      });
    }
  }, [file, form, isOpen]);

  const onSubmit = async (data: FormValues) => {
    if (!file) return;

    try {
      const fileExtension = file.name.includes(".") ? file.name.substring(file.name.lastIndexOf(".")) : "";

      const newFileName = data.name + fileExtension;

      await updateFile({
        crateId,
        fileId: file.id,
        updateData: {
          fileId: file.id,
          newName: newFileName,
        },
      });

      form.reset();
      onClose();
    } catch (err: any) {
      // Error handling is done in the mutation
    }
  };

  if (!file) return null;

  const fileExtension = file.name.includes(".") ? file.name.substring(file.name.lastIndexOf(".")) : "";

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
          <DialogTitle>Rename File</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Name</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter file name"
                        autoFocus={isOpen}
                        className="flex-1"
                      />
                      {fileExtension && (
                        <span className="text-sm text-muted-foreground font-mono">{fileExtension}</span>
                      )}
                    </div>
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
                {isPending ? "Renaming..." : "Rename File"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default RenameFileModal;
