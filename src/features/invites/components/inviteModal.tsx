import { toast } from "sonner";
import { Box, Check, Loader2, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { useAnimatedAction } from "@/hooks/useAnimationAction";
import { useGetInviteByToken } from "@/features/invites/hooks/queries/useGetInviteByToken";
import { useAcceptInvite } from "@/features/invites/hooks/mutations/useAcceptInvite";
import { useDeclineInvite } from "@/features/invites/hooks/mutations/useDeclineInvite";
import { useInviteStore } from "@/features/invites/store/inviteStore";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InviteModalSkeleton from "./InviteModalSkeleton";
import InviteError from "./InviteError";

export function InviteModal() {
  const token = useInviteStore((s) => s.token);
  const clearToken = useInviteStore((s) => s.clearToken);
  const navigate = useNavigate();

  const {
    data: invite,
    isLoading,
    error,
  } = useGetInviteByToken(token ?? "");

  const { mutateAsync: acceptInvite } = useAcceptInvite();
  const { mutateAsync: declineInvite } = useDeclineInvite();

  const acceptAnimation = useAnimatedAction();
  const declineAnimation = useAnimatedAction();

  const handleAccept = async () => {
    try {
      await acceptAnimation.run(() => acceptInvite(token!));
      toast.success("Invite accepted!");
      clearToken();
      navigate({ to: `/crates/${invite!.crateId}` });
    } catch {
      toast.error("Failed to accept invite.");
    }
  };

  const handleDecline = async () => {
    try {
      await declineAnimation.run(() => declineInvite(token!));
      toast.success("Invite declined.");
      clearToken();
    } catch {
      toast.error("Failed to decline invite.");
    }
  };

  const handleClose = () => {
    clearToken();
  };

  return (
    <Dialog open={!!token && !isLoading && !error} onOpenChange={handleClose}>
      <DialogContent className="text-foreground border-muted">
        {isLoading ? (
          <InviteModalSkeleton />
        ) : error || !invite ? (
          <InviteError onClose={handleClose} />
        ) : (
          <>
            <h3 className="text-lg font-semibold text-center flex justify-center w-full">
              You have been invited to join
            </h3>
            <div className="w-full flex justify-center items-center gap-2">
              <div
                className="rounded-md p-1 flex items-center justify-center"
                style={{ backgroundColor: invite.crateColor, width: 32, height: 32 }}
              >
                <Box size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold">{invite.crateName}</h3>
            </div>

            <p className="text-center mt-4">Would you like to accept the invitation?</p>

            <div className="flex gap-4 mt-4">
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
                className="flex flex-1 justify-center items-center gap-2 border-primary text-primary px-4 py-2 disabled:opacity-50 cursor-pointer transition-colors duration-300 rounded-lg hover:text-primary hover:bg-violet-50"
              >
                {declineAnimation.isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                {declineAnimation.isSuccess && <X className="h-5 w-5" />}
                {declineAnimation.isIdle && "Decline"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
