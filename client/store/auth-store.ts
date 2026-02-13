import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  onboardingComplete?: boolean;
  selectedCountry?: string;
  selectedUniversity?: string;
  selectedExam?: string;
  selectedPlan?: string;
  premiumPackage?: string;
  premiumPastPapers?: number | string;
  premiumAccessDays?: number;
  premiumDailyHours?: number;
  premiumPrice?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      isHydrated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response: any = await api.post("/auth/login", {
            email,
            password,
          });
          const { token, user, refreshToken } = response;

          // Store tokens in memory (Zustand) only, NOT in localStorage
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          // Store refreshToken securely (can be in httpOnly cookie on server if needed)
          // For now, store only in memory to avoid localStorage exposure
          if (typeof window !== "undefined") {
            sessionStorage.setItem("refreshToken", refreshToken);
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        try {
          const response: any = await api.post("/auth/register", data);
          const { token, user, refreshToken } = response;

          // Store tokens in memory (Zustand) only, NOT in localStorage
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          // Store refreshToken in sessionStorage (cleared when browser closes)
          if (typeof window !== "undefined") {
            sessionStorage.setItem("refreshToken", refreshToken);
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        // Remove tokens from memory
        set({ user: null, token: null, isAuthenticated: false });

        // Clear refreshToken from sessionStorage
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("refreshToken");
        }
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // NOTE: token is NOT persisted to localStorage for security
        // Token is only stored in memory and will be cleared on page reload
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    },
  ),
);
