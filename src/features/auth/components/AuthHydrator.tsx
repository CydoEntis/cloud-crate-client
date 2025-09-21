import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "../authStore";

interface AuthHydratorProps {
  children: ReactNode;
}

function AuthHydrator({ children }: AuthHydratorProps) {
  const { accessToken, isTokenExpiringSoon, clearAuth } = useAuthStore();

  useEffect(() => {
    if (accessToken && isTokenExpiringSoon(0)) {
      clearAuth();
    }
  }, [accessToken, isTokenExpiringSoon, clearAuth]);

  return <>{children}</>;
}

export default AuthHydrator;
