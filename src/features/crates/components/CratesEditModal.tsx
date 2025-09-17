import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useAnimatedAction } from "@/shared/hooks/useAnimationAction";
import { useApiFormErrorHandler } from "@/shared/hooks/useApiFromErrorHandler";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { ColorPicker } from "@/shared/components/ColorPicker";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useUpdateCrate } from "@/features/crates/api/crateQueries";
import type { UpdateCrateRequest, Crate } from "@/features/crates/crateTypes";
import { updateCrateSchema } from "@/features/crates/crateSchemas";

type CratesEditModalProps = {
  editingCrateId: string | null;
  crates?: Crate[];
  onClose: () => void;
};

function CratesEditModal({ editingCrateId, crates, onClose }: CratesEditModalProps) {
  const editingCrate = useMemo(() => crates?.find((c) => c.id === editingCrateId) ?? null, [crates, editingCrateId]);

  const { mutateAsync: updateCrate } = useUpdateCrate();
  const { phase, run } = useAnimatedAction();

  const form = useForm<UpdateCrateRequest>({
    resolver: zodResolver(updateCrateSchema),
    defaultValues: {
      name: editingCrate?.name ?? "",
      color: editingCrate?.color ?? "",
    },
  });

  const { globalError, handleApiError, clearErrors } = useApiFormErrorHandler(form);

  const onSubmit = async (request: UpdateCrateRequest) => {
    if (!editingCrate) return;

    try {
      await run(() => updateCrate({ crateId: editingCrate.id, request }));
      form.reset(request);
      toast.success("Crate updated successfully!");
      onClose();
    } catch (err) {
      form.reset(request);
      handleApiError(err);
    }
  };

  if (!editingCrate) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="mt-10 max-w-lg text-foreground bg-card border-none"
        onClick={(e) => e.stopPropagation()}
        style={{ top: "25%", transform: "translate(0, 0)" }}
      >
        <DialogHeader>
          <DialogTitle>Edit Crate</DialogTitle>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
}

export default CratesEditModal;
