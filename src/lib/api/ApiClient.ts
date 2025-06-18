import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { useAuthStore } from "@/features/auth/authStore";

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

  // === Interceptors ===
  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
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
            const res = await this.api.post("/auth/refresh");
            const { accessToken, userId } = res.data;

            // ✅ Update Zustand store
            useAuthStore.getState().setAuth(accessToken, userId);
            this.processQueue(null, accessToken);

            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            useAuthStore.getState().clearAuth(); // ✅ logout on failure
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

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, config);
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data, config);
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url, config);
  }

  public get instance(): AxiosInstance {
    return this.api;
  }
}
