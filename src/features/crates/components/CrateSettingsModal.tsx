import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColorPicker } from "@/components/ColorPicker";
import { useState } from "react";

import { extractApiErrors } from "@/lib/formUtils";
import type { UpdateCrateRequest } from "../types";
import { updateCrateSchema } from "../schemas";

interface CrateSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  crateId: string;
  initialName: string;
  initialColor: string;
}

function CrateSettingsModal({ isOpen, onClose, crateId, initialName, initialColor }: CrateSettingsModalProps) {
  const { mutateAsync: updateCrate, isLoading } = useUpdateCrate();
  const [error, setError] = useState("");

  const form = useForm<UpdateCrateRequest>({
    resolver: zodResolver(updateCrateSchema),
    defaultValues: {
      name: initialName,
      color: initialColor,
    },
  });

  const onSubmit = async (data: UpdateCrateRequest) => {
    try {
      await updateCrate({ crateId, ...data });
      onClose();
      form.reset(data); // reset with latest values
    } catch (err) {
      const globalError = extractApiErrors(err, form);
      if (globalError) setError(globalError);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crate Settings</DialogTitle>
          <DialogDescription>Change crate name and color</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input {...form.register("name")} placeholder="Crate name" onChange={() => setError("")} />
          <ColorPicker name="color" control={form.control} disabled={false} />
          {error && <p className="text-sm text-red-500 font-medium -mt-1">{error}</p>}
          <Button type="submit" disabled={isLoading}>
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
