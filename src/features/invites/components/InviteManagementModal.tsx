import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Box, Check, Loader2, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { useGetInviteByToken, useAcceptInvite, useDeclineInvite } from "../api/inviteQueries";
import { useInviteStore } from "../inviteStore";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";

const useAnimatedAction = () => {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const run = async (action: () => Promise<any>) => {
    setState("loading");
    try {
      await action();
      setState("success");
      setTimeout(() => setState("idle"), 1000);
    } catch (error) {
      setState("error");
      setTimeout(() => setState("idle"), 1000);
      throw error;
    }
  };

  return {
    run,
    isIdle: state === "idle",
    isLoading: state === "loading",
    isSuccess: state === "success",
    isError: state === "error",
  };
};

export function InviteManagementModal() {
  const token = useInviteStore((s) => s.token);
  const clearToken = useInviteStore((s) => s.clearToken);
  const navigate = useNavigate();

  const { data: invite, isLoading, error } = useGetInviteByToken(token ?? "");
  const { mutateAsync: acceptInvite } = useAcceptInvite();
  const { mutateAsync: declineInvite } = useDeclineInvite();
  const acceptAnimation = useAnimatedAction();
  const declineAnimation = useAnimatedAction();

  const handleAccept = async () => {
    try {
      await acceptAnimation.run(() => acceptInvite(token!));
      navigate({ to: `/crates/${invite!.crateId}` });
    } catch {
    } finally {
      clearToken();
    }
  };

  const handleDecline = async () => {
    try {
      await declineAnimation.run(() => declineInvite(token!));
    } catch {
    } finally {
      clearToken();
    }
  };

  const handleClose = () => {
    clearToken();
  };

  useEffect(() => {
    if (error) {
      clearToken();
    }
  }, [error, clearToken]);

  return (
    <Dialog open={!!token && !isLoading && !error} onOpenChange={handleClose}>
      <DialogContent className="max-w-md text-foreground border-accent">
        {isLoading ? (
          <div className="p-6 text-center">Loading invite...</div>
        ) : error || !invite ? (
          <div className="p-6 text-center">Invalid or expired invite.</div>
        ) : (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-center flex justify-center w-full mb-4">
              You have been invited to join
            </h3>

            <div className="w-full flex justify-center items-center gap-2 mb-6">
              <div
                className="rounded-md p-1 flex items-center justify-center"
                style={{ backgroundColor: invite.crateColor || "#6366f1", width: 32, height: 32 }}
              >
                <Box size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold">{invite.crateName || "Untitled Crate"}</h3>
            </div>

            <p className="text-center mb-6">Would you like to accept the invitation?</p>

            <div className="flex gap-4">
              <Button
                onClick={handleAccept}
                disabled={!acceptAnimation.isIdle || !declineAnimation.isIdle}
                className="flex flex-1 justify-center items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-50 hover:bg-primary/90 transition-colors duration-300"
              >
                {acceptAnimation.isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                {acceptAnimation.isSuccess && <Check className="h-5 w-5" />}
                {acceptAnimation.isIdle && "Accept"}
              </Button>

              <Button
                variant="outline"
                onClick={handleDecline}
                disabled={!acceptAnimation.isIdle || !declineAnimation.isIdle}
                className="flex flex-1 justify-center items-center gap-2 border-primary text-primary px-4 py-2 disabled:opacity-50 hover:bg-primary/10 transition-colors duration-300 rounded-lg"
              >
                {declineAnimation.isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                {declineAnimation.isSuccess && <X className="h-5 w-5" />}
                {declineAnimation.isIdle && "Decline"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
