import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ColorPicker } from "@/components/ColorPicker";
import { Slider } from "@/components/ui/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useCrateModalStore } from "../store/crateModalStore";
import { useCreateCrate } from "../hooks/mutations/useCreateCrate";
import { useApiFormErrorHandler } from "@/hooks/useApiFromErrorHandler";
import { toast } from "sonner";
import { createCreateCrateSchema, type StorageDetails } from "../schemas/CreateCrateSchema";
import type z from "zod";
import type { User } from "@/features/user/types/User";

type CreateCrateModalProps = {
  user: User;
};

export default function CreateCrateModal({ user }: CreateCrateModalProps) {
  const { isOpen, close } = useCrateModalStore();
  const { mutateAsync: createCrate, isPending } = useCreateCrate();
  const BytesPerGb = 1024;

  const storage: StorageDetails = {
    usedStorageMb: user.usedStorageMb,
    maxStorageMb: user.maxStorageMb,
  };

  const schema = createCreateCrateSchema(storage);
  type FormValues = z.infer<typeof schema>;

  const minAlloc = Math.max(1024, user.usedStorageMb);
  const maxAlloc = user.maxStorageMb;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      color: "#ffffff",
      allocatedStorageMb: minAlloc, // default to minimum allowed
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
      await createCrate(data);
      toast.success("Crate created successfully");
      onClose();
    } catch (err) {
      handleApiError(err);
    }
  };

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
              name="allocatedStorageMb"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allocate Storage (GB)</FormLabel>
                  <FormControl>
                    <div className="flex flex-col">
                      <Slider
                        value={[field.value]} // Slider expects an array
                        min={minAlloc}
                        max={maxAlloc}
                        step={1024}
                        onValueChange={(val) => field.onChange(val[0])} // Convert back to number
                      />
                      <div className="mt-2 text-sm text-muted-foreground">
                        {Math.round(field.value / BytesPerGb)} GB selected
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {globalError && <p className="text-sm text-red-500 font-medium">{globalError}</p>}

            <Button type="submit" disabled={isPending} className="text-secondary">
              Create Crate
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
