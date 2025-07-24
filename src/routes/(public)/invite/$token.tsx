import { useEffect } from "react";
import { toast } from "sonner";
import { Check, Loader2, X } from "lucide-react";

import { useAnimatedAction } from "@/hooks/useAnimationAction";
import { useAuthStore, useUserStore } from "@/features/auth/store";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useGetInviteByToken } from "@/features/invites/hooks/queries/useGetInviteByToken";
import { useAcceptInvite } from "@/features/invites/hooks/mutations/useAcceptInvite";
import { useDeclineInvite } from "@/features/invites/hooks/mutations/useDeclineInvite";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/invite/$token")({
  component: InviteHandlerPage,
});

export default function InviteHandlerPage() {
  const { token } = useParams({ strict: false });
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  const { data: invite, isLoading, error } = useGetInviteByToken(token ?? "");
  const { mutateAsync: acceptInvite } = useAcceptInvite();
  const { mutateAsync: declineInvite } = useDeclineInvite();

  const acceptAnimation = useAnimatedAction();
  const declineAnimation = useAnimatedAction();

  useEffect(() => {
    if (!token) return;

    if (!isAuthenticated) {
      navigate({
        to: "/login",
        search: (old) => ({ ...old, inviteToken: token }),
      });
    }
  }, [token, isAuthenticated, navigate]);

  console.log("INVITE: ", invite);

  if (isLoading) return <div>Loading invite...</div>;
  if (error || !invite) return <div>Invalid or expired invite.</div>;

  console.log("User: ", user);

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

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">
        You have been invited to join <strong>{invite.crateName}</strong>.
      </h2>
      <p>Would you like to accept the invitation?</p>

      <div className="flex gap-4">
        <button
          onClick={handleAccept}
          disabled={!acceptAnimation.isIdle || !declineAnimation.isIdle}
          className="flex flex-1 justify-center items-center gap-2 rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {acceptAnimation.isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
          {acceptAnimation.isSuccess && <Check className="h-5 w-5" />}
          {acceptAnimation.isIdle && "Accept"}
        </button>

        <button
          onClick={handleDecline}
          disabled={!acceptAnimation.isIdle || !declineAnimation.isIdle}
          className="flex flex-1 justify-center items-center gap-2 rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {declineAnimation.isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
          {declineAnimation.isSuccess && <X className="h-5 w-5" />}
          {declineAnimation.isIdle && "Decline"}
        </button>
      </div>
    </div>
  );
}
