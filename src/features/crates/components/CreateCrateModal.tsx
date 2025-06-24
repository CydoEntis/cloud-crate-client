import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createCrateSchema } from "../schemas";
import type { CreateCrateRequest } from "../types";
import { useCrateModalStore } from "../crateModalStore";
import { useCreateCrate } from "../hooks";
import { extractApiErrors } from "@/lib/formUtils";
import { useState } from "react";
import { ColorPicker } from "@/components/ColorPicker";

export function CreateCrateModal() {
  const { isOpen, close } = useCrateModalStore();
  const { mutateAsync: createCrate, isPending } = useCreateCrate();
  const [error, setError] = useState("");
  const form = useForm<CreateCrateRequest>({
    resolver: zodResolver(createCrateSchema),
    defaultValues: { name: "", color: "" },
  });

  const onSubmit = async (data: CreateCrateRequest) => {
    try {
      await createCrate(data);
      close();
      form.reset();
    } catch (err) {
      const globalError = extractApiErrors(err, form);
      if (globalError) {
        setError(globalError);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Your First Crate</DialogTitle>
          <DialogDescription>Enter a name and pick a color</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Crate name"
            {...form.register("name", {
              onChange: (e) => {
                form.setValue("name", e.target.value);
                setError("");
              },
            })}
          />
          <ColorPicker name="color" control={form.control} />
          {error && <p className="text-sm text-red-500 font-medium -mt-1">{error}</p>}
          <Button type="submit" disabled={isPending}>
            Create Crate
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
