import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ColorPicker";
import { Loader2, Check } from "lucide-react";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { UpdateCrateSchema } from "../schemas/UpdateCrateSchema";
import { useUpdateCrate } from "../hooks/mutations/useUpdateCrate";
import { setFieldErrorsFromValidationResponse } from "@/lib/formUtils";
import type { UpdateCrateRequest } from "../types/UpdateCrateRequest";
import { useAnimatedAction } from "@/hooks/useAnimationAction";
import { useApiFormErrorHandler } from "@/hooks/useApiFromErrorHandler";

type UpdateCrateFormProps = {
  crateId: string;
  initialName: string;
  initialColor: string;
  onSuccess?: () => void;
};

function UpdateCrateForm({ crateId, initialName, initialColor, onSuccess }: UpdateCrateFormProps) {
  const { mutateAsync: updateCrate } = useUpdateCrate();
  const { phase, run } = useAnimatedAction();

  const form = useForm<UpdateCrateRequest>({
    resolver: zodResolver(UpdateCrateSchema),
    defaultValues: { name: initialName, color: initialColor },
  });

  const { globalError, handleApiError, clearErrors } = useApiFormErrorHandler(form);

  const onSubmit = async (data: UpdateCrateRequest) => {
    try {
      await run(() => updateCrate({ crateId, ...data }));
      form.reset(data);
      toast.success("Crate updated successfully!");
      onSuccess?.();
    } catch (err) {
      form.reset(data);
      handleApiError(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={phase !== "idle"}
                  autoComplete="off"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    form.clearErrors("name");
                  }}
                  className="border-none h-full text-xl rounded-lg py-2 text-foreground 
             focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
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
                <ColorPicker control={form.control} name={field.name} disabled={phase !== "idle"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={phase !== "idle"} className="w-full">
          {phase === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : phase === "success" ? (
            <div className="flex items-center gap-1">
              <Check className="h-8 w-8 text-white" />
              <span>Updated</span>
            </div>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default UpdateCrateForm;
