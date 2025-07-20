import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCrateModalStore } from "../store/crateModalStore";
import { ColorPicker } from "@/components/ColorPicker";
import { useCreateCrate } from "../hooks/mutations/useCreateCrate";
import type { CreateCrateRequest } from "../types/CreateCrateRequest";
import { CreateCrateSchema } from "../schemas/CreateCrateSchema";
import { useApiFormErrorHandler } from "@/hooks/useApiFromErrorHandler";

function CreateCrateModal() {
  const { isOpen, close } = useCrateModalStore();
  const { mutateAsync: createCrate, isPending } = useCreateCrate();

  const form = useForm<CreateCrateRequest>({
    resolver: zodResolver(CreateCrateSchema),
    defaultValues: { name: "", color: "" },
  });

  const { globalError, handleApiError, clearErrors } = useApiFormErrorHandler(form);

  const onSubmit = async (data: CreateCrateRequest) => {
    try {
      await createCrate(data);
      form.reset();
      close();
    } catch (err) {
      handleApiError(err);
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
                clearErrors();
              },
            })}
          />

          <ColorPicker name="color" control={form.control} />

          {globalError && <p className="text-sm text-red-500 font-medium -mt-1">{globalError}</p>}

          <Button type="submit" disabled={isPending}>
            Create Crate
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCrateModal;
