import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Slider } from "@/shared/components/ui/slider";
import { useUserStore } from "@/features/user/userStore";
import { useCreateCrate, useUpdateCrate } from "@/features/crates/api/crateQueries";
import { crateService } from "@/features/crates/api/crateService";
import { createCreateCrateSchema } from "@/features/crates/crateSchemas";
import type { CrateDetails, UpdateCrateRequest } from "@/features/crates/crateTypes";
import { setFormErrors } from "@/shared/utils/errorHandler";
import { ColorPicker } from "@/shared/components/color-picker/ColorPicker";
import { useNavigate } from "@tanstack/react-router";
import { useCrateModalStore } from "../store/crateModalStore";

type FormValues = {
  name: string;
  color: string;
  allocatedStorageGb: number;
};

export default function UpsertCrateModal() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [crate, setCrate] = useState<CrateDetails | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const { isOpen, crateId, close } = useCrateModalStore();
  const isEditing = !!crateId;
  const { mutateAsync: createCrate, isPending: isCreating } = useCreateCrate();
  const { mutateAsync: updateCrate, isPending: isUpdating } = useUpdateCrate();

  const BytesPerGb = 1024 * 1024 * 1024;
  const remainingGb = user ? Math.floor(user.remainingAllocationBytes / BytesPerGb) : 0;

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
  }, [isEditing, crate?.allocatedStorageBytes, user?.usedStorageBytes, user?.accountStorageLimitBytes, remainingGb]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      color: "#4B9CED",
      allocatedStorageGb: 1,
    },
  });

  const clearErrors = () => {
    setGlobalError(null);
    form.clearErrors();
  };

  useEffect(() => {
    if (!crateId || !isOpen) {
      setCrate(null);
      form.reset({
        name: "",
        color: "#4B9CED",
        allocatedStorageGb: 1,
      });
      return;
    }

    let cancelled = false;
    crateService
      .getCrate(crateId)
      .then((data) => {
        if (!cancelled) {
          setCrate(data);
          form.reset({
            name: data.name,
            color: data.color,
            allocatedStorageGb: Math.floor(data.allocatedStorageBytes / BytesPerGb),
          });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error(err);
          toast.error("Failed to fetch crate details");
          close();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [crateId, isOpen, close, form, BytesPerGb]);

  const handleClose = () => {
    form.reset();
    clearErrors();
    close();
  };

  const onSubmit = async (data: FormValues) => {
    try {
      clearErrors();
      if (isEditing && crate) {
        const updateData: UpdateCrateRequest = {
          name: data.name,
          color: data.color,
          storageAllocationGb: data.allocatedStorageGb,
        };
        await updateCrate({ crateId: crate.id, request: updateData });
        handleClose();
      } else {
        const crateId = await createCrate(data);
        handleClose();
        navigate({
          to: "/crates/$crateId",
          params: { crateId: crateId },
        });
      }
    } catch (err) {
      const globalError = setFormErrors(err, form);
      setGlobalError(globalError);
    }
  };

  const isPending = isCreating || isUpdating;

  if (!isOpen || (!isEditing && !user)) return null;

  const minAlloc = remainingGb >= 1 ? 1 : remainingGb > 0 ? remainingGb : 0;
  const crateCurrentGb = crate ? Math.floor(crate.allocatedStorageBytes / BytesPerGb) : 1;
  const crateUsedGb = crate ? Math.ceil(crate.usedStorageBytes / BytesPerGb) : 0;
  const maxGb = isEditing && crate ? crateCurrentGb + remainingGb : Math.max(1, remainingGb);
  const minGb = isEditing ? Math.max(crateUsedGb, 5) : 5;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="border-none shadow bg-card text-foreground max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        aria-describedby={isEditing ? "edit-crate-description" : "create-crate-description"}
      >
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">{isEditing ? "Edit Crate" : "Create Your Crate"}</DialogTitle>
          {!isEditing && (
            <DialogDescription id="create-crate-description" className="text-sm">
              Enter a name, pick a color, and allocate storage
            </DialogDescription>
          )}
          {isEditing && (
            <DialogDescription id="edit-crate-description" className="text-sm">
              Update your crate's name, color, or storage allocation
            </DialogDescription>
          )}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4" noValidate>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">{isEditing ? "Name" : "Crate Name"}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      autoComplete="off"
                      className="text-sm sm:text-base"
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
                  <FormLabel className="text-sm sm:text-base">Color</FormLabel>
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
                const currentValue = typeof field.value === "number" ? field.value : crateCurrentGb;
                return (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      {isEditing ? "Adjust Storage Allocation (GB)" : "Allocate Storage (GB)"}
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <Slider
                          value={[currentValue]}
                          min={minGb}
                          max={maxGb}
                          step={5}
                          onValueChange={(val) => {
                            field.onChange(val[0]);
                            clearErrors();
                          }}
                          className="w-full"
                          disabled={isPending}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Min: {minGb} GB</span>
                          <span>Max: {maxGb} GB</span>
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
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
              <div className="p-2 sm:p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-xs sm:text-sm text-destructive font-medium">{globalError}</p>
              </div>
            )}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isPending}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || (!isEditing && remainingGb <= 0)}
                className="w-full sm:w-auto"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
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
