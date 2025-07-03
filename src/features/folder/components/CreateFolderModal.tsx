import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ColorPicker } from "@/components/ColorPicker";

type FormData = {
  name: string;
  color: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, color: string) => void;
};

export default function CreateFolderModal({ isOpen, onClose, onCreate }: Props) {
  const [error, setError] = useState("");

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      color: "#4ade80",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: FormData) => {
    try {
      await onCreate(data.name, data.color);
      reset();
      setError("");
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
      <DialogContent className="sm:max-w-md">
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
              {...register("name", { required: "Folder name is required" })}
              placeholder="Enter folder name"
              onChange={() => setError("")}
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <ColorPicker name="color" control={control} />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Folder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
