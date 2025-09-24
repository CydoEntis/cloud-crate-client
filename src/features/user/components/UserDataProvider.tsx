import { useGetUser } from "../api/userQueries";
import { useUserStore } from "../userStore";
import { useAuthStore } from "@/features/auth/authStore";
import { useEffect, useState, type ReactNode } from "react";
import apiService from "@/shared/lib/api/ApiService";

interface UserDataProviderProps {
  children: ReactNode;
}

export function UserDataProvider({ children }: UserDataProviderProps) {
  const setUser = useUserStore((state) => state.setUser);
  const { accessToken, isTokenExpiringSoon, setAuth, clearAuth, isAuthenticated } = useAuthStore();

  const [initializationComplete, setInitializationComplete] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  const shouldFetchUser = initializationComplete && isAuthenticated;
  const { isLoading, isError, data: user, error } = useGetUser(shouldFetchUser);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!accessToken || isTokenExpiringSoon(1)) {
        try {
          console.log("🔄 UserDataProvider - attempting token refresh on initialization...");

          const response = await apiService.post("/auth/refresh");
          const { data: result, isSuccess, message } = response.data;

          if (!isSuccess || !result) {
            throw new Error(message || "Token refresh failed");
          }

          const { accessToken: newAccessToken, accessTokenExpires } = result;

          setAuth({
            accessToken: newAccessToken,
            accessTokenExpires: new Date(accessTokenExpires).toISOString(),
          });

          console.log("✅ UserDataProvider - token refreshed successfully");
        } catch (error) {
          console.log("❌ UserDataProvider - token refresh failed, user needs to login");
          clearAuth();
          setInitializationError("Authentication expired. Please log in again.");
        }
      }

      setInitializationComplete(true);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if (!initializationComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Initializing...</p>
        </div>
      </div>
    );
  }

  if (initializationError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive mb-2">Authentication Error</p>
          <p className="text-sm text-muted-foreground">{initializationError}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive mb-2">Failed to load user data</p>
          <p className="text-sm text-muted-foreground">{error?.message || "Please try refreshing the page"}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
