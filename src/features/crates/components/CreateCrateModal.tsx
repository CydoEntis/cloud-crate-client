import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCrateSchema } from "../schemas";
import { useCreateCrate } from "../hooks";
import type { CreateCrateRequest } from "../types";

type CreateCrateModalProps = {
  showModal: boolean;
  setShowModal: (open: boolean) => void;
};

export function CreateCrateModal({ showModal, setShowModal }: CreateCrateModalProps) {
  const form = useForm<CreateCrateRequest>({
    resolver: zodResolver(createCrateSchema),
    defaultValues: { name: "", color: "" },
  });

  const createCrateMutation = useCreateCrate();

  const onSubmit = (data: CreateCrateRequest) => {
    createCrateMutation.mutate(data, {
      onSuccess: () => {
        setShowModal(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Your First Crate</DialogTitle>
          <DialogDescription>Enter a name and pick a color</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Crate name" {...form.register("name")} disabled={createCrateMutation.isPending} />

          <Select onValueChange={(val) => form.setValue("color", val)} disabled={createCrateMutation.isPending}>
            <SelectTrigger>
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="#FF9E09">Orange</SelectItem>
              <SelectItem value="#76D9C6">Teal</SelectItem>
              <SelectItem value="#B256EB">Purple</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="w-full" disabled={createCrateMutation.isPending}>
            {createCrateMutation.isPending ? "Creating..." : "Create Crate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
