import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check } from "lucide-react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Switch } from "@/shared/components/ui/switch";
import { useCreateInvite } from "../api/adminQueries";
import { useAnimatedAction } from "@/shared/hooks/useAnimationAction";
import { useApiFormErrorHandler } from "@/shared/hooks/useApiFromErrorHandler";

const inviteUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  isAdmin: z.boolean(),
});

type FormValues = z.infer<typeof inviteUserSchema>;

type AdminInviteUserModalProps = {
  open: boolean;
  onClose: () => void;
};

function AdminInviteUserModal({ open, onClose }: AdminInviteUserModalProps) {
  const { mutateAsync: createInvite } = useCreateInvite();
  const { phase, run } = useAnimatedAction();

  const form = useForm<FormValues>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: "",
      isAdmin: false,
    },
  });

  const { globalError, handleApiError, clearErrors } = useApiFormErrorHandler(form);

  const handleClose = () => {
    form.reset();
    clearErrors?.();
    onClose();
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await run(() => createInvite(data));
      handleClose();
    } catch (err) {
      handleApiError(err);
    }
  };

  const isPending = phase !== "idle";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="border-none shadow bg-card text-foreground max-w-lg"
        style={{ top: "25%", transform: "translate(0, 0)" }}
      >
        <DialogHeader>
          <DialogTitle>Invite New User</DialogTitle>
          <DialogDescription>
            Send an invitation to a new user. They'll receive an email with instructions to create their account.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      className="border-accent"
                      {...field}
                      type="email"
                      placeholder="user@example.com"
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
              name="isAdmin"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Admin Privileges</FormLabel>
                    <div className="text-sm text-muted-foreground">Grant administrative access to this user</div>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                  </FormControl>
                </FormItem>
              )}
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
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  phase === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : phase === "success" ? (
                    <div className="flex items-center gap-1">
                      <Check className="h-4 w-4 text-white" />
                      <span>Sent</span>
                    </div>
                  ) : null
                ) : (
                  "Send Invite"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AdminInviteUserModal;
