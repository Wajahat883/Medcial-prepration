import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth-store";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Helper to get token from Zustand store (memory only)
const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;

  try {
    const authStore = useAuthStore.getState();

    if (!authStore.isHydrated) {
      console.warn("[API] Auth store not hydrated yet");
    }

    if (authStore?.token) {
      console.log("[API] Using token from Zustand store (memory)");
      return authStore.token;
    } else {
      console.warn("[API] No token available in auth store");
    }
    return null;
  } catch (e) {
    console.warn("[API] Error accessing auth store:", e);
    return null;
  }
};

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token) {
      console.log("[API] Adding Authorization header");
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("[API] No token available for request to", config.url);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

// API methods
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((res) => res.data),
};

export default apiClient;
