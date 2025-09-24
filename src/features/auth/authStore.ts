import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  accessTokenExpires: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setAuth: (tokens: { accessToken: string; accessTokenExpires: string }) => void;
  updateAccessToken: (accessToken: string, expires: string) => void;
  clearMemoryAuth: () => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  isTokenExpiringSoon: (thresholdMinutes?: number) => boolean;
  isTokenValid: () => boolean;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        accessToken: null,
        accessTokenExpires: null,
        isAuthenticated: false,
        isLoading: false,

        setAuth: (tokens) => {
          console.log("🔧 setAuth called with:", {
            hasToken: !!tokens.accessToken,
            expires: tokens.accessTokenExpires,
          });

          if (!tokens.accessToken || !tokens.accessTokenExpires) {
            console.error("⚠️ setAuth called with invalid tokens");
            return;
          }

          set({
            accessToken: tokens.accessToken,
            accessTokenExpires: tokens.accessTokenExpires,
            isAuthenticated: true,
            isLoading: false,
          });
        },

        updateAccessToken: (accessToken, expires) => {
          console.log("🔧 updateAccessToken called");

          if (!accessToken || !expires) {
            console.error("⚠️ updateAccessToken called with invalid data");
            return;
          }

          set({
            accessToken,
            accessTokenExpires: expires,
          });
        },

        clearMemoryAuth: () => {
          console.log("🔧 clearMemoryAuth called - clearing tokens but keeping auth status");
          set({
            accessToken: null,
            accessTokenExpires: null,
            isLoading: false,
          });
        },

        logout: () => {
          console.log("🚨 Full logout - removing all auth data");

          localStorage.removeItem("auth-store");

          set({
            accessToken: null,
            accessTokenExpires: null,
            isAuthenticated: false,
            isLoading: false,
          });
        },

        setLoading: (loading) => {
          set({ isLoading: loading });
        },

        isTokenExpiringSoon: (thresholdMinutes = 5) => {
          const { accessTokenExpires } = get();
          if (!accessTokenExpires) return true;

          const expiryTime = new Date(accessTokenExpires).getTime();
          const currentTime = Date.now();
          const thresholdTime = currentTime + thresholdMinutes * 60 * 1000;

          return expiryTime < thresholdTime;
        },

        isTokenValid: () => {
          const { accessToken, accessTokenExpires } = get();

          if (!accessToken || !accessTokenExpires) {
            return false;
          }

          const expiryTime = new Date(accessTokenExpires).getTime();
          const currentTime = Date.now();

          return expiryTime > currentTime + 30000;
        },
      }),
      {
        name: "auth-store",
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
        }),
        version: 1,
        onRehydrateStorage: () => (state) => {
          if (state) {
            console.log("🏪 Auth store rehydrated - authenticated:", state.isAuthenticated);

            if (state.isAuthenticated && !state.accessToken) {
              console.log("🔄 Authenticated but no token in memory - will refresh on first API call");
            }
          }
        },
      }
    ),
    { name: "AuthStore" }
  )
);

export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);
export const useHasValidToken = () =>
  useAuthStore((state) => state.isAuthenticated && !!state.accessToken && state.isTokenValid());
