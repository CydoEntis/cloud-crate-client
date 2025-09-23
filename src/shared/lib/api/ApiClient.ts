import { useAuthStore } from "@/features/auth/authStore";
import { handleApiError, isSuspensionError, showErrorToast } from "@/shared/utils/errorHandler";
import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

export class ApiService {
  private api: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: {
    resolve: (token: string) => void;
    reject: (error: any) => void;
  }[] = [];

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      withCredentials: true,
    });
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config) => {
        const { accessToken, isTokenExpiringSoon } = useAuthStore.getState();

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        if (import.meta.env.DEV && accessToken && isTokenExpiringSoon()) {
          console.log("⚠️ Access token is expiring soon, will refresh on next API call if needed");
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        if (import.meta.env.DEV) {
          console.error(`❌ ${error.response?.status} ${error.config?.url}`, error);
        }

        // Check for suspension error BEFORE handling 401s
        if (isSuspensionError(error)) {
          // Show suspension toast
          showErrorToast(error);

          // Clear auth and redirect
          const { clearAuth } = useAuthStore.getState();
          clearAuth();

          if (typeof window !== "undefined") {
            // Small delay to let toast show
            setTimeout(() => {
              window.location.href = "/login";
            }, 1500);
          }

          return Promise.reject(error);
        }

        const originalRequest = error.config as any;
        const isAuthEndpoint = originalRequest.url?.includes("/auth/");

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
          originalRequest._retry = true;

          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({
                resolve: (token: string) => {
                  originalRequest.headers["Authorization"] = `Bearer ${token}`;
                  resolve(this.api(originalRequest));
                },
                reject,
              });
            });
          }

          this.isRefreshing = true;

          try {
            const response = await this.api.post("/auth/refresh");

            const { data: result, isSuccess } = response.data;

            if (!isSuccess || !result) {
              throw new Error("Token refresh failed");
            }

            const { accessToken, accessTokenExpires } = result;

            useAuthStore.getState().setAuth({
              accessToken,
              accessTokenExpires,
            });

            this.processQueue(null, accessToken);

            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError, null);

            const { clearAuth } = useAuthStore.getState();
            clearAuth();

            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }

            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(error: any, token: string | null = null): void {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token!);
      }
    });
    this.failedQueue = [];
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.api.get<T>(url, config);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.api.post<T>(url, data, config);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.api.put<T>(url, data, config);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.api.delete<T>(url, config);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.api.patch<T>(url, data, config);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  public get instance(): AxiosInstance {
    return this.api;
  }
}

const apiService = new ApiService(import.meta.env.VITE_API_URL);
export default apiService;
