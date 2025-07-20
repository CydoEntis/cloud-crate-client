import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ColorPicker } from "@/components/ColorPicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCrateModalStore } from "../store/crateModalStore";
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

  const onClose = () => {
    form.clearErrors();
    form.reset();
    close();
  }

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Your First Crate</DialogTitle>
          <DialogDescription>Enter a name and pick a color</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crate Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        clearErrors();
                      }}
                    />
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

            {globalError && <p className="text-sm text-red-500 font-medium">{globalError}</p>}

            <Button type="submit" disabled={isPending}>
              Create Crate
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCrateModal;
