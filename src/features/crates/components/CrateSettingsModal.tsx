import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setFieldErrorsFromValidationResponse } from "@/lib/formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateCrate } from "../hooks/useUpdateCrate";
import { updateCrateSchema } from "../schemas";
import type { UpdateCrateRequest } from "../types";
import { ColorPicker } from "@/components/ColorPicker";

type CrateSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  crateId: string;
  initialName: string;
  initialColor: string;
};

function CrateSettingsModal({ isOpen, onClose, crateId, initialName, initialColor }: CrateSettingsModalProps) {
  const { mutateAsync: updateCrate, isPending } = useUpdateCrate();
  const [error, setError] = useState("");

  const form = useForm<UpdateCrateRequest>({
    resolver: zodResolver(updateCrateSchema),
    defaultValues: { name: initialName, color: initialColor },
  });

  const onSubmit = async (data: UpdateCrateRequest) => {
    try {
      await updateCrate({ crateId, ...data });
      onClose();
      form.reset(data);
    } catch (err: unknown) {
      console.log(err);
      form.clearErrors();

      if (isAxiosError(err)) {
        const errors = err.response?.data?.errors;
        if (errors && typeof errors === "object" && !Array.isArray(errors)) {
          setFieldErrorsFromValidationResponse(form, errors);
          setError("");
          return;
        }
        setError(err.response?.data?.message || "An unknown error occurred");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crate Settings</DialogTitle>
          <DialogDescription>Change crate name and color</DialogDescription>
        </DialogHeader>
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
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setError("");
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
                    <ColorPicker control={form.control} name={field.name} disabled={false} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-sm text-red-500 font-medium -mt-1">{error}</p>}

            <Button type="submit" disabled={isPending}>
              Save Changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CrateSettingsModal;
