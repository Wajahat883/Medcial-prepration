import { create } from "zustand";
import { api } from "@/lib/api";

interface CategoryPerformance {
  category: string;
  attempted: number;
  correct: number;
  accuracy: number;
  totalQuestions: number;
  completionRate: number;
}

interface ProgressData {
  date: string;
  testsCompleted: number;
  averageScore: number;
}

interface StudyStreak {
  currentStreak: number;
  lastStudyDate: string;
  last7Days: {
    date: string;
    studied: boolean;
    testsCompleted: number;
  }[];
}

interface AnalyticsState {
  categoryPerformance: CategoryPerformance[] | null;
  progressOverTime: ProgressData[] | null;
  studyStreak: StudyStreak | null;
  isLoading: boolean;
  fetchAnalytics: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  categoryPerformance: null,
  progressOverTime: null,
  studyStreak: null,
  isLoading: false,

  fetchAnalytics: async () => {
    set({ isLoading: true });
    try {
      const [categoryRes, progressRes, streakRes]: any[] = await Promise.all([
        api.get("/analytics/subjects"),
        api.get("/analytics/trends"),
        api.get("/analytics/study-streak"),
      ]);

      set({
        categoryPerformance: categoryRes?.data || [],
        progressOverTime: progressRes?.data || [],
        studyStreak: streakRes?.data || null,
        isLoading: false,
      });
    } catch (error) {
      set({ 
        categoryPerformance: [],
        progressOverTime: [],
        studyStreak: null,
        isLoading: false 
      });
      throw error;
    }
  },
}));
