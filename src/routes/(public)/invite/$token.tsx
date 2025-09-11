import { useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "@/features/auth/store";
import { useInviteStore } from "@/features/invites/store/inviteStore";

export const Route = createFileRoute("/(public)/invite/$token")({
  component: PublicInviteRedirectPage,
});

function PublicInviteRedirectPage() {
  const { token } = useParams({ strict: false });
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore.getState().isAuthenticated();
  const setPendingToken = useInviteStore((s) => s.setToken);

  useEffect(() => {
    if (!token) return;
    setPendingToken(token);

    if (!isAuthenticated) {
      navigate({
        to: "/login",
        search: { inviteToken: token },
        replace: true,
      });
    } else {
      navigate({
        to: "/",
        replace: true,
      });
    }
  }, [token, isAuthenticated]);

  return null;
}
