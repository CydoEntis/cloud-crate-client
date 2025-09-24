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
  const clearUser = useUserStore((state) => state.clearUser);
  const { accessToken, isTokenExpiringSoon, setAuth, clearAuth, isAuthenticated, setLoading } = useAuthStore();

  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("🔄 UserDataProvider initializing auth...", {
        hasToken: !!accessToken,
        isExpiring: accessToken ? isTokenExpiringSoon(1) : true,
        isAuthenticated,
      });

      if (!accessToken || isTokenExpiringSoon(1)) {
        setLoading(true);

        try {
          console.log("🔄 Attempting token refresh with HTTP-only cookie...");
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

          console.log("✅ Token refreshed successfully");
        } catch (error) {
          console.log("❌ Token refresh failed:", error);
          clearAuth();
          clearUser();
        } finally {
          setLoading(false);
        }
      }

      setAuthInitialized(true);
    };

    initializeAuth();
  }, []);

  const shouldFetchUser = authInitialized && isAuthenticated;
  const { isLoading: isUserLoading, isError, data: user, error } = useGetUser(shouldFetchUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  useEffect(() => {
    if (!isAuthenticated) {
      clearUser();
    }
  }, [isAuthenticated, clearUser]);

  if (!authInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Initializing...</p>
        </div>
      </div>
    );
  }

  if (shouldFetchUser && isUserLoading) {
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
