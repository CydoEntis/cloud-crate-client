import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ColorPicker } from "@/components/ColorPicker";
import type { CreateFolder } from "../../types/folder/request/CreateFolder";
import { CreateFolderSchema } from "../../schemas/folder/CreateFolderSchema";


type CreateFolderData = Pick<CreateFolder, "name" | "color">;

type CreateFolderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, color: string) => Promise<void>;
  isLoading: boolean;
};

function CreateFolderModal({ isOpen, onClose, onCreate, isLoading }: CreateFolderModalProps) {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateFolderData>({
    resolver: zodResolver(CreateFolderSchema.pick({ name: true, color: true })),
    defaultValues: {
      name: "",
      color: "#4ade80",
    },
  });

  const onSubmit = async (data: CreateFolderData) => {
    try {
      setError("");
      await onCreate(data.name, data.color);
      reset();
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to create folder");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          reset();
          setError("");
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-md border-none shadow bg-card text-foreground">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Folder Name
            </label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter folder name"
              onChange={() => setError("")}
              disabled={isLoading || isSubmitting}
              className="border-none h-full text-xl rounded-lg py-2 text-foreground 
             focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <ColorPicker name="color" control={control} disabled={isLoading || isSubmitting} />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading || isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isSubmitting} className="text-secondary">
              {isLoading || isSubmitting ? "Creating..." : "Create Folder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFolderModal;
