import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useUpdateDisplayName, useChangePassword } from "@/features/user/api/userQueries";
import { useUserStore } from "@/features/user/userStore";
import { setFormErrors } from "@/shared/utils/errorHandler";

const displayNameSchema = z.object({
  displayName: z
    .string()
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name must be less than 50 characters"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type DisplayNameFormValues = z.infer<typeof displayNameSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserSettingsModal({ isOpen, onClose }: UserSettingsModalProps) {
  const user = useUserStore((state) => state.user);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const { mutateAsync: updateDisplayName, isPending: isUpdatingName } = useUpdateDisplayName();
  const { mutateAsync: changePassword, isPending: isChangingPassword } = useChangePassword();

  const displayNameForm = useForm<DisplayNameFormValues>({
    resolver: zodResolver(displayNameSchema),
    defaultValues: {
      displayName: user?.displayName || "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const clearErrors = () => {
    setGlobalError(null);
    displayNameForm.clearErrors();
    passwordForm.clearErrors();
  };

  const handleClose = () => {
    displayNameForm.reset();
    passwordForm.reset();
    clearErrors();
    onClose();
  };

  const onSubmitDisplayName = async (data: DisplayNameFormValues) => {
    try {
      clearErrors();
      await updateDisplayName(data.displayName);
      handleClose();
    } catch (err) {
      const error = setFormErrors(err, displayNameForm);
      setGlobalError(error);
    }
  };

  const onSubmitPassword = async (data: PasswordFormValues) => {
    try {
      clearErrors();
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      passwordForm.reset();
      handleClose();
    } catch (err) {
      const error = setFormErrors(err, passwordForm);
      setGlobalError(error);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="border-none shadow text-foreground max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Account Settings</DialogTitle>
          <DialogDescription className="text-sm">Update your display name or change your password</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="display-name" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="display-name">Display Name</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>

          <TabsContent value="display-name" className="space-y-4 pt-4">
            <Form {...displayNameForm}>
              <form onSubmit={displayNameForm.handleSubmit(onSubmitDisplayName)} className="space-y-4" noValidate>
                <FormField
                  control={displayNameForm.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isUpdatingName}
                          placeholder="Enter your display name"
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

                {globalError && (
                  <div className="p-2 sm:p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-xs sm:text-sm text-destructive font-medium">{globalError}</p>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={handleClose} disabled={isUpdatingName}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isUpdatingName}>
                    {isUpdatingName ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Updating...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="password" className="space-y-4 pt-4">
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4" noValidate>
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          disabled={isChangingPassword}
                          placeholder="Enter current password"
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
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          disabled={isChangingPassword}
                          placeholder="Enter new password"
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
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          disabled={isChangingPassword}
                          placeholder="Confirm new password"
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

                {globalError && (
                  <div className="p-2 sm:p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-xs sm:text-sm text-destructive font-medium">{globalError}</p>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={handleClose} disabled={isChangingPassword}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isChangingPassword}>
                    {isChangingPassword ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Changing...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
