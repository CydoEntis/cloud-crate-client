import { useGetUser } from "../api/userQueries";
import { useUserStore } from "../userStore";
import { useAuthStore } from "@/features/auth/authStore";
import { useEffect, useState, useRef, type ReactNode } from "react";

type UserDataProviderProps = {
  children: ReactNode;
};

export function UserDataProvider({ children }: UserDataProviderProps) {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const { isAuthenticated } = useAuthStore();

  const [authInitialized, setAuthInitialized] = useState(false);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) {
      console.log("🔄 Auth already initialized, skipping...");
      return;
    }

    console.log("🔄 UserDataProvider initializing...", {
      isAuthenticated,
    });

    initRef.current = true;
    setAuthInitialized(true);
  }, []);

  const shouldFetchUser = authInitialized && isAuthenticated;

  const { isLoading: isUserLoading, isError, data: user, error } = useGetUser(shouldFetchUser);

  useEffect(() => {
    if (user) {
      console.log("👤 User data loaded successfully");
      setUser(user);
    }
  }, [user, setUser]);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("👤 Not authenticated, clearing user data");
      clearUser();
    }
  }, [isAuthenticated, clearUser]);


  return <>{children}</>;
}
