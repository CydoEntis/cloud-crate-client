import { useState } from "react";
import { Mail, UserPlus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { CrateRole } from "@/features/crates/crateTypes";
import SearchInputField from "@/shared/components/SearchInputField";
import { useInviteToCrate } from "../api/inviteQueries";
import type { CrateInviteRequest } from "../inviteTypes";
import { crateInviteFormSchema } from "../inviteSchemas";
import IconInputField from "@/shared/components/IconInputField";

type InviteFormProps = {
  crateId: string;
};

function InviteForm({ crateId }: InviteFormProps) {
  const inviteUser = useInviteToCrate();
  const [searchValue, setSearchValue] = useState("");
  const [selectedRole, setSelectedRole] = useState<CrateRole>(CrateRole.Member);

  const handleInvite = () => {
    if (!searchValue.trim() || !isValidEmail(searchValue.trim())) return;

    const inviteRequest: CrateInviteRequest = {
      crateId: crateId,
      invitedEmail: searchValue.trim(),
      role: selectedRole,
    };

    inviteUser.mutate(inviteRequest, {
      onSuccess: () => {
        setSearchValue("");
        setSelectedRole(CrateRole.Member);
      },
    });
  };

  const isValidEmail = (email: string): boolean => {
    const result = crateInviteFormSchema.shape.email.safeParse(email);
    return result.success;
  };

  const getValidEmails = () => {
    return searchValue
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email && isValidEmail(email));
  };

  const canInvite = searchValue.trim() && getValidEmails().length > 0;

  return (
    <div className="space-y-3">
      <div className="flex gap-1">
        <IconInputField
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Enter email address"
          icon={Mail}
          type="email"
        />

        <Select value={selectedRole} onValueChange={(value: string) => setSelectedRole(value as CrateRole)}>
          <SelectTrigger className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-muted">
            {Object.values(CrateRole)
              .filter((role) => role !== CrateRole.Owner)
              .map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-1 ">
        <Button variant="outline" onClick={handleInvite} disabled={!canInvite || inviteUser.isPending} className="h-9">
          <UserPlus className="h-4 w-4 mr-1" />
          {inviteUser.isPending ? "Inviting..." : "Invite"}
        </Button>
      </div>
    </div>
  );
}

export default InviteForm;
