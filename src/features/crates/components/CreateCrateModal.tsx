import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useCrateModalStore } from "../store/crateModalStore";
import { useCreateCrate } from "../hooks/mutations/useCreateCrate";
import { useApiFormErrorHandler } from "@/shared/hooks/useApiFromErrorHandler";
import { useUserStore } from "@/features/user/user.store"; // Import user store
import { toast } from "sonner";
import { createCreateCrateSchema } from "../schemas/CreateCrateSchema";
import type z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { ColorPicker } from "@/shared/components/ColorPicker";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Slider } from "@radix-ui/react-slider";

// Remove the user prop requirement
function CreateCrateModal() {
  const { isOpen, close } = useCrateModalStore();
  const { mutateAsync: createCrate, isPending } = useCreateCrate();

  // Get user from store instead of props
  const user = useUserStore((state) => state.user);

  // Don't render if no user (though this shouldn't happen in protected routes)
  if (!user) {
    return null;
  }

  const BytesPerGb = 1024 * 1024 * 1024;

  const usedGb = Math.floor(user.usedStorageBytes / BytesPerGb);
  const maxGb = Math.floor(user.accountStorageLimitBytes / BytesPerGb);
  const remainingGb = Math.floor(user.remainingAllocationBytes / BytesPerGb);

  const minAlloc = remainingGb >= 1 ? 1 : remainingGb > 0 ? remainingGb : 0;
  const maxAlloc = Math.max(remainingGb, minAlloc);
  const defaultAlloc = Math.min(Math.max(minAlloc, 1), remainingGb);

  const schema = createCreateCrateSchema({
    usedStorageBytes: user.usedStorageBytes,
    accountStorageLimitBytes: user.accountStorageLimitBytes,
  });

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      color: "#ffffff",
      allocatedStorageGb: defaultAlloc,
    },
  });

  const { globalError, handleApiError, clearErrors } = useApiFormErrorHandler(form);

  const onClose = () => {
    form.reset();
    clearErrors();
    close();
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await createCrate({
        name: data.name,
        color: data.color,
        allocatedStorageGb: data.allocatedStorageGb,
      });

      toast.success("Crate created successfully");
      onClose();
    } catch (err) {
      handleApiError(err);
    }
  };

  const hasAvailableStorage = remainingGb > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="border-none shadow bg-card text-foreground"
        style={{ top: "25%", transform: "translate(0, 0)" }}
      >
        <DialogHeader>
          <DialogTitle>Create Your Crate</DialogTitle>
          <DialogDescription>Enter a name, pick a color, and allocate storage</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Crate Name */}
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
                      className="border-none h-full text-xl rounded-lg py-2 text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
                      placeholder="Enter crate name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Color Picker */}
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

            {/* Storage Slider */}
            <Controller
              name="allocatedStorageGb"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allocate Storage (GB)</FormLabel>
                  <FormControl>
                    {hasAvailableStorage ? (
                      <div className="flex flex-col space-y-2">
                        <Slider
                          value={[field.value ?? defaultAlloc]}
                          min={minAlloc}
                          max={maxAlloc}
                          step={1}
                          onValueChange={(val) => {
                            field.onChange(val[0]);
                            clearErrors();
                          }}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Min: {minAlloc} GB</span>
                          <span>Max: {maxAlloc} GB</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {field.value || defaultAlloc} GB selected (Remaining: {remainingGb} GB)
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                        <p className="text-sm text-destructive font-medium">
                          No remaining storage available. Please upgrade your plan or free up space.
                        </p>
                      </div>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Global Error Display */}
            {globalError && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive font-medium">{globalError}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || !hasAvailableStorage} className="text-secondary">
                {isPending ? "Creating..." : "Create Crate"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCrateModal;
