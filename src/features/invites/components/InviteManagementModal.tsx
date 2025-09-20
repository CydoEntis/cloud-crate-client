import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Mail, Clock, Users } from "lucide-react";
import { useInviteStore } from "../inviteStore";
import { useGetInviteByToken, useAcceptInvite, useDeclineInvite } from "../api/inviteQueries";

export function InviteManagementModal() {
  const { token, clearToken, setProcessing, isProcessing } = useInviteStore();
  const { data: invite, isLoading, error } = useGetInviteByToken(token || "");
  const acceptInvite = useAcceptInvite();
  const declineInvite = useDeclineInvite();

  const isOpen = !!token && !isProcessing;

  const handleAccept = async () => {
    if (!token) return;

    try {
      setProcessing(true);
      await acceptInvite.mutateAsync(token);
      clearToken();
    } catch (error) {
      setProcessing(false);
      // Error is handled by the mutation's onError
    }
  };

  const handleDecline = async () => {
    if (!token) return;

    try {
      setProcessing(true);
      await declineInvite.mutateAsync(token);
      clearToken();
    } catch (error) {
      setProcessing(false);
      // Error is handled by the mutation's onError
    }
  };

  const handleClose = () => {
    clearToken();
  };

  // Clear token if invite fetch fails
  useEffect(() => {
    if (error) {
      clearToken();
    }
  }, [error, clearToken]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Crate Invitation
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : invite ? (
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{invite.crateName || "Untitled Crate"}</h3>
                    <div  className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {invite.role}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    You've been invited to collaborate on this crate as a <strong>{invite.role}</strong>.
                  </p>

                  {invite.expiresAt && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Expires: {new Date(invite.expiresAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={handleAccept}
                disabled={acceptInvite.isPending || declineInvite.isPending}
              >
                {acceptInvite.isPending ? "Accepting..." : "Accept Invitation"}
              </Button>

              <Button
                variant="outline"
                className="flex-1"
                onClick={handleDecline}
                disabled={acceptInvite.isPending || declineInvite.isPending}
              >
                {declineInvite.isPending ? "Declining..." : "Decline"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Invite not found or has expired.</p>
            <Button variant="outline" onClick={handleClose} className="mt-4">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
