import { useAuthStore } from "@/features/auth/authStore";
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
      // timeout: 10000, 
    });
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // if (import.meta.env.DEV) {
        //   console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, config.data);
        // }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => {
        // if (import.meta.env.DEV) {
        //   console.log(`✅ ${response.status} ${response.config.url}`, response.data);
        // }
        return response;
      },
      async (error: AxiosError) => {
        if (import.meta.env.DEV) {
          console.error(`❌ ${error.response?.status} ${error.config?.url}`, error);
        }

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
            const { accessToken } = res.data;

            useAuthStore.getState().setAuth(accessToken);
            this.processQueue(null, accessToken);

            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            useAuthStore.getState().clearAuth();

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
    return this.api.get<T>(url, config);
  }

  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data, config);
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data, config);
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url, config);
  }

  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.patch<T>(url, data, config);
  }

  public get instance(): AxiosInstance {
    return this.api;
  }

  public parseApiError(error: AxiosError): string {
    if (error.response?.data) {
      const data = error.response.data as any;

      if (error.response.status === 422 && data.errors) {
        const firstError = Object.values(data.errors)[0] as string;
        return Array.isArray(firstError) ? firstError[0] : firstError;
      }

      if (data.message) return data.message;
      if (typeof data === "string") return data;
    }

    switch (error.response?.status) {
      case 400:
        return "Bad request";
      case 401:
        return "Please log in again";
      case 403:
        return "Access denied";
      case 404:
        return "Not found";
      case 500:
        return "Server error";
      default:
        return "Something went wrong";
    }
  }
}
const apiService = new ApiService(import.meta.env.VITE_API_URL);
export default apiService;
