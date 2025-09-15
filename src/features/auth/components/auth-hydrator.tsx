import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "../auth.store";

interface AuthHydratorProps {
  children: ReactNode;
}

function AuthHydrator({ children }: AuthHydratorProps) {
  const { accessToken, validateStoredToken, clearAuth } = useAuthStore();

  useEffect(() => {
    if (accessToken) {
      validateStoredToken(accessToken).then((isValid) => {
        if (!isValid) {
          clearAuth();
        }
      });
    }
  }, [accessToken, validateStoredToken, clearAuth]);

  return <>{children}</>;
}

export default AuthHydrator;