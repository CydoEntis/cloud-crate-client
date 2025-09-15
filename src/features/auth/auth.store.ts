import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setAuth: (tokens: { accessToken: string; refreshToken?: string }) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  validateStoredToken: (token: string) => Promise<boolean>;
  isTokenExpiringSoon: (token: string, thresholdMinutes?: number) => boolean;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,

        setAuth: (tokens) =>
          set((state) => {
            state.accessToken = tokens.accessToken;
            if (tokens.refreshToken) {
              state.refreshToken = tokens.refreshToken;
            }
            state.isAuthenticated = true;
            state.isLoading = false;
          }),

        clearAuth: () =>
          set((state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.isLoading = false;
          }),

        setLoading: (loading) =>
          set((state) => {
            state.isLoading = loading;
          }),

        validateStoredToken: async (token) => {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const isExpired = payload.exp * 1000 < Date.now();

            if (isExpired) {
              get().clearAuth();
              return false;
            }

            return true;
          } catch (error) {
            console.warn("Invalid token format:", error);
            get().clearAuth();
            return false;
          }
        },

        isTokenExpiringSoon: (token, thresholdMinutes = 5) => {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const expiryTime = payload.exp * 1000;
            const thresholdTime = Date.now() + thresholdMinutes * 60 * 1000;

            return expiryTime < thresholdTime;
          } catch {
            return true;
          }
        },
      })),
      {
        name: "auth-store",
        partialize: (state) => ({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          isAuthenticated: state.isAuthenticated,
        }),
        version: 1,
      }
    ),
    { name: "AuthStore" }
  )
);

export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);
