import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

// Components
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Slider } from "@/shared/components/ui/slider";
import { ColorPicker } from "@/shared/components/ColorPicker";

// Hooks & API
import { useUserStore } from "@/features/user/userStore";
import { useCreateCrate, useUpdateCrate } from "@/features/crates/api/crateQueries";
import { crateService } from "@/features/crates/api/crateService";
import { createCreateCrateSchema } from "@/features/crates/crateSchemas";
import type { CrateDetails, UpdateCrateRequest } from "@/features/crates/crateTypes";
import { useAnimatedAction } from "@/shared/hooks/useAnimationAction";
import { useApiFormErrorHandler } from "@/shared/hooks/useApiFromErrorHandler";
import { useCrateModalStore } from "../store/crateModalStore";

type FormValues = {
  name: string;
  color: string;
  allocatedStorageGb: number;
};

export default function UpsertCrateModal() {
  const user = useUserStore((state) => state.user);
  const [crate, setCrate] = useState<CrateDetails | null>(null);
  const { open, close, isOpen, crateId } = useCrateModalStore();

  const isEditing = !!crateId;

  const { mutateAsync: createCrate, isPending: isCreating } = useCreateCrate();
  const { mutateAsync: updateCrate } = useUpdateCrate();
  const { phase, run } = useAnimatedAction();
  const BytesPerGb = 1024 * 1024 * 1024;

  const remainingGb = user ? Math.floor(user.remainingAllocationBytes / BytesPerGb) : 0;
  const minAlloc = remainingGb >= 1 ? 1 : remainingGb > 0 ? remainingGb : 0;
  const defaultAlloc =
    isEditing && crate
      ? Math.floor(crate.allocatedStorageBytes / BytesPerGb)
      : Math.min(Math.max(minAlloc, 1), remainingGb);

  const schema = useMemo(() => {
    return isEditing && crate
      ? z.object({
          name: z.string().min(3).max(100),
          color: z.string().min(1),
          allocatedStorageGb: z
            .number()
            .min(1)
            .max(crate.allocatedStorageBytes / BytesPerGb + remainingGb),
        })
      : createCreateCrateSchema({
          usedStorageBytes: user?.usedStorageBytes || 0,
          accountStorageLimitBytes: user?.accountStorageLimitBytes || 0,
        });
  }, [isEditing, crate, user?.usedStorageBytes, user?.accountStorageLimitBytes, remainingGb]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: crate?.name ?? "",
      color: crate?.color ?? "#4B9CED",
      allocatedStorageGb: defaultAlloc,
    },
  });

  const { globalError, handleApiError, clearErrors } = useApiFormErrorHandler(form);

  useEffect(() => {
    if (!crateId) {
      setCrate(null);
      return;
    }

    crateService
      .getCrate(crateId)
      .then(setCrate)
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch crate details");
        close();
      });
  }, [crateId, close]);

  useEffect(() => {
    form.reset({
      name: crate?.name ?? "",
      color: crate?.color ?? "#4B9CED",
      allocatedStorageGb: defaultAlloc,
    });
  }, [crate, defaultAlloc, form]);

  const handleClose = () => {
    form.reset();
    clearErrors?.();
    close();
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (isEditing && crate) {
        const updateData: UpdateCrateRequest = {
          name: data.name,
          color: data.color,
          storageAllocationGb: data.allocatedStorageGb,
        };
        await run(() => updateCrate({ crateId: crate.id, request: updateData }));
      } else {
        await run(() => createCrate(data));
      }
      handleClose();
    } catch (err) {
      handleApiError(err);
    }
  };

  const isPending = isCreating || phase !== "idle";

  if (!open || (!isEditing && !user)) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="border-none shadow bg-card text-foreground max-w-lg"
        style={{ top: "25%", transform: "translate(0, 0)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Crate" : "Create Your Crate"}</DialogTitle>
          {!isEditing && <DialogDescription>Enter a name, pick a color, and allocate storage</DialogDescription>}
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isEditing ? "Name" : "Crate Name"}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      autoComplete="off"
                      onChange={(e) => {
                        field.onChange(e);
                        clearErrors?.();
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
                    <ColorPicker control={form.control} name={field.name} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              name="allocatedStorageGb"
              control={form.control}
              render={({ field }) => {
                const crateCurrentGb = isEditing && crate ? Math.floor(crate.allocatedStorageBytes / BytesPerGb) : 1;

                const crateUsedGb = isEditing && crate ? Math.ceil(crate.usedStorageBytes / BytesPerGb) : 0;

                const currentValue = typeof field.value === "number" ? field.value : crateCurrentGb;

                const maxGb = isEditing && crate ? crateCurrentGb + remainingGb : Math.max(1, remainingGb);

                const minGb = isEditing ? Math.max(crateUsedGb, 1) : 1;

                return (
                  <FormItem>
                    <FormLabel>{isEditing ? "Adjust Storage Allocation (GB)" : "Allocate Storage (GB)"}</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <Slider
                          value={[currentValue]}
                          min={minGb}
                          max={maxGb}
                          step={1}
                          onValueChange={(val) => {
                            field.onChange(val[0]);
                            clearErrors?.();
                          }}
                          className="w-full"
                          disabled={isPending}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Min: {minGb} GB</span>
                          <span>Max: {maxGb} GB</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {currentValue} GB selected
                          {isEditing && ` (Currently allocated: ${crateCurrentGb} GB, In use: ${crateUsedGb} GB)`}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {globalError && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive font-medium">{globalError}</p>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || (!isEditing && remainingGb <= 0)}>
                {isPending ? (
                  phase === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      {isEditing ? "Updating..." : "Creating..."}
                    </>
                  ) : phase === "success" ? (
                    <div className="flex items-center gap-1">
                      <Check className="h-4 w-4 text-white" />
                      <span>{isEditing ? "Updated" : "Created"}</span>
                    </div>
                  ) : null
                ) : isEditing ? (
                  "Save Changes"
                ) : (
                  "Create Crate"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
