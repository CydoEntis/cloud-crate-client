import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ColorPicker } from "@/components/ColorPicker";
import { useUpdateCrate } from "../hooks/useUpdateCrate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateCrateSchema } from "../schemas";
import type { UpdateCrateRequest } from "../types";
import { useState } from "react";
import { isAxiosError } from "axios";
import { setFieldErrorsFromValidationResponse } from "@/lib/formUtils";
import InviteCollaborators from "@/features/invites/components/InivteCollaborators";

type CrateSettingsPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  crateId: string;
  initialName: string;
  initialColor: string;
};

function CrateSettingsPanel({ isOpen, onClose, crateId, initialName, initialColor }: CrateSettingsPanelProps) {
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
    } catch (err) {
      form.clearErrors();
      if (isAxiosError(err)) {
        const errors = err.response?.data?.errors;
        if (errors && typeof errors === "object" && !Array.isArray(errors)) {
          setFieldErrorsFromValidationResponse(form, errors);
          setError("");
          return;
        }
        setError(err.response?.data?.message || "An unknown error occurred");
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="px-4 py-8">
        <SheetHeader className="p-0">
          <SheetTitle>Crate Settings</SheetTitle>
          <SheetDescription>Update crate info, manage collaborators, or delete this crate.</SheetDescription>
        </SheetHeader>

        <div className="mt-6">
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
                          form.clearErrors("name");
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

              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

              <Button type="submit" disabled={isPending}>
                Save Changes
              </Button>
            </form>
          </Form>
        </div>

        {/* Additions below */}
        <div className="border-t mt-8 pt-6 space-y-4">
          <InviteCollaborators crateId={crateId} />
          {/* Member management placeholder */}
          <div>
            <h4 className="text-sm font-semibold mb-1">Collaborators</h4>
            <p className="text-xs text-muted-foreground">Coming soon: Invite or remove users.</p>
          </div>

          {/* Danger zone */}
          <div>
            <h4 className="text-sm font-semibold text-destructive mb-1">Delete Crate</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Deleting this crate will permanently remove all its contents.
            </p>
            <Button
              variant="outline"
              className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
            >
              Delete Crate
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CrateSettingsPanel;
