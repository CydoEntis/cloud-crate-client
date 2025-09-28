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
          if (!tokens.accessToken || !tokens.accessTokenExpires) {
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
          if (!accessToken || !expires) {
            return;
          }

          set({
            accessToken,
            accessTokenExpires: expires,
          });
        },

        clearMemoryAuth: () => {
          set({
            accessToken: null,
            accessTokenExpires: null,
            isLoading: false,
          });
        },

        logout: () => {
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
            if (state.isAuthenticated && !state.accessToken) {
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
