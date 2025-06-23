import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createCrate } from "../api";
import { createCrateSchema } from "../schemas";
import type { CreateCrateRequest } from "../types";
import { useCrateModalStore } from "../crateModalStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateCrate } from "../hooks";
import { extractApiErrors } from "@/lib/formUtils";
import { useState } from "react";

export function CreateCrateModal() {
  const { isOpen, close } = useCrateModalStore();
  const { mutateAsync: createCrate, isPending } = useCreateCrate();
  const [error, setError] = useState("");
  const form = useForm<CreateCrateRequest>({
    resolver: zodResolver(createCrateSchema),
    defaultValues: { name: "" },
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
          <Input placeholder="Crate name" {...form.register("name")} />
          {/* <Select onValueChange={(val) => form.setValue("color", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="#FF9E09">Orange</SelectItem>
              <SelectItem value="#76D9C6">Teal</SelectItem>
              <SelectItem value="#B256EB">Purple</SelectItem>
            </SelectContent>
          </Select> */}
          {error && <p className="text-sm text-red-500 font-medium -mt-1">{error}</p>}
          <Button type="submit" disabled={isPending}>
            Create Crate
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
