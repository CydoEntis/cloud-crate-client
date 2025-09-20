import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { CrateRole } from "@/features/crates/crateTypes";
import SearchInputField from "@/shared/components/SearchInputField";
import { useInviteToCrate } from "../api/inviteQueries";
import type { CrateInviteRequest } from "../inviteTypes";
import { crateInviteFormSchema } from "../inviteSchemas";

type InviteFormProps = {
  crateId: string;
};

function InviteForm({ crateId }: InviteFormProps) {
  const inviteUser = useInviteToCrate();
  const [searchValue, setSearchValue] = useState("");
  const [selectedRole, setSelectedRole] = useState<CrateRole>(CrateRole.Viewer);
  const [expirationMinutes, setExpirationMinutes] = useState<number>(30);

  const handleInvite = () => {
    if (!searchValue.trim()) return;

    const emails = searchValue
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email && isValidEmail(email));

    if (emails.length === 0) return;

    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + expirationMinutes);

    emails.forEach((email) => {
      const inviteRequest: CrateInviteRequest = {
        crateId: crateId,
        email: email,
        role: selectedRole,
        expiresAt: expirationDate,
      };

      inviteUser.mutate(inviteRequest);
    });

    setSearchValue("");
    setSelectedRole(CrateRole.Viewer);
    setExpirationMinutes(30);
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
      <div className="flex items-center gap-2">
        <SearchInputField
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Enter email(s) separated by commas"
        />
        <Button variant="outline" onClick={handleInvite} disabled={!canInvite || inviteUser.isPending}>
          <UserPlus className="h-4 w-4 mr-1" />
          {inviteUser.isPending ? "Inviting..." : "Invite"}
        </Button>
      </div>

      {/* Rest of your component stays the same */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Role:</span>
          <Select value={selectedRole} onValueChange={(value: string) => setSelectedRole(value as CrateRole)}>
            <SelectTrigger className="w-[120px] h-8">
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

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Expires:</span>
          <Select
            value={expirationMinutes.toString()}
            onValueChange={(value: string) => setExpirationMinutes(parseInt(value))}
          >
            <SelectTrigger className="w-[90px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-muted">
              <SelectItem value="15">15 min</SelectItem>
              <SelectItem value="30">30 min</SelectItem>
              <SelectItem value="60">60 min</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default InviteForm;
