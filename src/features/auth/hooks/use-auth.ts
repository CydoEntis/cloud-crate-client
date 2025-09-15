import { useAuthStore } from "../auth.store";
import { useUserStore } from "../../user/user.store";

export function useAuth() {
  const auth = useAuthStore();
  const user = useUserStore((state) => state.user);

  return {
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    accessToken: auth.accessToken,
    user,
    logout: auth.clearAuth,
  };
}
