import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";

import { useAnimatedAction } from "@/shared/hooks/useAnimationAction";
import { useApiFormErrorHandler } from "@/shared/hooks/useApiFromErrorHandler";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { ColorPicker } from "@/shared/components/ColorPicker";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useUpdateCrate } from "../api/crate.queries";
import type { UpdateCrateRequest } from "../crate.types";
import { updateCrateSchema } from "../crate.schemas";

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
    resolver: zodResolver(updateCrateSchema),
    defaultValues: { name: initialName, color: initialColor },
  });

  const { globalError, handleApiError, clearErrors } = useApiFormErrorHandler(form);

  const onSubmit = async (request: UpdateCrateRequest) => {
    try {
      await run(() => updateCrate({ crateId, request }));
      form.reset(request);
      toast.success("Crate updated successfully!");
      onSuccess?.();
    } catch (err) {
      form.reset(request);
      handleApiError(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-foreground" noValidate>
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
