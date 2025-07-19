import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useInviteToCrate } from "../hooks/mutations/useInviteToCrate";
import { CrateInviteRequestSchema } from "../schemas/CrateInviteRequestSchema";
import type { CrateInviteRequest } from "../types/CrateInviteRequest";
import { CrateRole } from "../types/CrateRole";

type InviteCollaboratorsProps = { crateId: string };

export default function InviteCollaborators({ crateId }: InviteCollaboratorsProps) {
  const form = useForm<CrateInviteRequest>({
    resolver: zodResolver(CrateInviteRequestSchema),
    defaultValues: {
      email: "",
      role: CrateRole.Viewer,
      expiresAt: 15,
    },
  });

  const { mutateAsync: invite, isPending } = useInviteToCrate();

  const onSubmit = async (data: CrateInviteRequest) => {
    try {
      const expiresAtDate = new Date(Date.now() + data.expiresAt * 60 * 1000);

      await invite({
        crateId,
        data: {
          ...data,
          expiresAt: expiresAtDate,
        },
      });
      form.reset();
    } catch (error) {
      form.setError("email", { message: "Failed to send invitation" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Email Input */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter email to invite" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 items-end">
          {/* Role Select */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={CrateRole.Editor}>Editor</SelectItem>
                      <SelectItem value={CrateRole.Viewer}>Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ExpiresAt Select */}
          <FormField
            control={form.control}
            name="expiresAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expires in</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      // Select returns string, convert to number for minutes
                      field.onChange(Number(value));
                    }}
                    value={String(field.value)}
                    defaultValue={String(field.value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select expiration time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="flex-1">
            Send Invite
          </Button>
        </div>
      </form>
    </Form>
  );
}
