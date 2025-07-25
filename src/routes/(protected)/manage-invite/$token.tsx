import { useEffect } from "react";
import { toast } from "sonner";
import { Check, Loader2, X } from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

import { useAnimatedAction } from "@/hooks/useAnimationAction";
import { useUserStore } from "@/features/auth/store";
import { useGetInviteByToken } from "@/features/invites/hooks/queries/useGetInviteByToken";
import { useAcceptInvite } from "@/features/invites/hooks/mutations/useAcceptInvite";
import { useDeclineInvite } from "@/features/invites/hooks/mutations/useDeclineInvite";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/(protected)/manage-invite/$token")({
  component: ManageInvitePage,
});

function ManageInvitePage() {
  const { token } = useParams({ strict: false });
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);

  const { data: invite, isLoading, error } = useGetInviteByToken(token ?? "");
  const { mutateAsync: acceptInvite } = useAcceptInvite();
  const { mutateAsync: declineInvite } = useDeclineInvite();

  console.log(user);
  console.log(invite);

  const acceptAnimation = useAnimatedAction();
  const declineAnimation = useAnimatedAction();

  const handleAccept = async () => {
    try {
      await acceptAnimation.run(() => acceptInvite(token!));
      toast.success("Invite accepted!");
      navigate({ to: `/crates/${invite!.crateId}` });
    } catch {
      toast.error("Failed to accept invite.");
    }
  };

  const handleDecline = async () => {
    try {
      await declineAnimation.run(() => declineInvite(token!));
      toast.success("Invite declined.");
      navigate({ to: "/" });
    } catch {
      toast.error("Failed to decline invite.");
    }
  };

  if (isLoading) return <div>Loading invite...</div>;
  if (error || !invite) return <div>Invalid or expired invite.</div>;

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">
        You have been invited to join <strong>{invite.crateName}</strong>.
      </h2>
      <p>Would you like to accept the invitation?</p>

      <div className="flex gap-4">
        <Button
          onClick={handleAccept}
          disabled={!acceptAnimation.isIdle || !declineAnimation.isIdle}
          className="flex flex-1 justify-center items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-50 cursor-pointer hover:bg-violet-600 transition-colors duration-300"
        >
          {acceptAnimation.isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
          {acceptAnimation.isSuccess && <Check className="h-5 w-5" />}
          {acceptAnimation.isIdle && "Accept"}
        </Button>

        <Button
          variant="outline"
          onClick={handleDecline}
          disabled={!acceptAnimation.isIdle || !declineAnimation.isIdle}
          className="flex flex-1 justify-center items-center gap-2  border-primary text-primary  px-4 py-2  disabled:opacity-50 cursor-pointer  transition-colors duration-300 rounded-lg hover:text-primary hover:bg-violet-50"
        >
          {declineAnimation.isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
          {declineAnimation.isSuccess && <X className="h-5 w-5" />}
          {declineAnimation.isIdle && "Decline"}
        </Button>
      </div>
    </div>
  );
}
