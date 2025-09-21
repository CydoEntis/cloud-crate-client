import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  accessToken: string | null;
  accessTokenExpires: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setAuth: (tokens: { accessToken: string; accessTokenExpires: string }) => void;
  updateAccessToken: (accessToken: string, expires: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  isTokenExpiringSoon: (thresholdMinutes?: number) => boolean;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        accessToken: null,
        accessTokenExpires: null,
        isAuthenticated: false,
        isLoading: false,

        setAuth: (tokens) =>
          set((state) => {
            state.accessToken = tokens.accessToken;
            state.accessTokenExpires = tokens.accessTokenExpires;
            state.isAuthenticated = true;
            state.isLoading = false;
          }),

        updateAccessToken: (accessToken, expires) =>
          set((state) => {
            state.accessToken = accessToken;
            state.accessTokenExpires = expires;
          }),

        clearAuth: () =>
          set((state) => {
            state.accessToken = null;
            state.accessTokenExpires = null;
            state.isAuthenticated = false;
            state.isLoading = false;
          }),

        setLoading: (loading) =>
          set((state) => {
            state.isLoading = loading;
          }),

        isTokenExpiringSoon: (thresholdMinutes = 5) => {
          const { accessTokenExpires } = get();
          if (!accessTokenExpires) return true;

          const expiryTime = new Date(accessTokenExpires).getTime();
          const thresholdTime = Date.now() + thresholdMinutes * 60 * 1000;

          return expiryTime < thresholdTime;
        },
      })),
      {
        name: "auth-store",
        partialize: (state) => ({
          accessToken: state.accessToken,
          accessTokenExpires: state.accessTokenExpires,
          isAuthenticated: state.isAuthenticated,
        }),
        version: 3, 
      }
    ),
    { name: "AuthStore" }
  )
);

export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);
