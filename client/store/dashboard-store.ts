import { create } from "zustand";
import { api } from "@/lib/api";

interface DashboardStats {
  totalQuestions: number;
  questionsAttempted: number;
  completionRate: number;
  completedTests: number;
  averageScore: number;
  accuracy: number;
  streakDays: number;
  lastStudyDate: string | null;
}

interface DashboardState {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  isLoading: false,
  error: null,

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    let retries = 0;
    const maxRetries = 3;

    const attemptFetch = async (): Promise<void> => {
      try {
        const response: any = await api.get("/analytics/overview");
        set({ stats: response?.data || response, isLoading: false });
      } catch (error: any) {
        // Retry if it's a 401 (token might not be ready yet)
        if (error.response?.status === 401 && retries < maxRetries) {
          retries++;
          // Wait a bit before retrying
          await new Promise((resolve) => setTimeout(resolve, 500 * retries));
          return attemptFetch();
        }

        const errorMessage =
          error.message || "Failed to fetch dashboard statistics";
        set({ isLoading: false, error: errorMessage });
        console.error("Failed to fetch stats:", error);
      }
    };

    return attemptFetch();
  },
}));
