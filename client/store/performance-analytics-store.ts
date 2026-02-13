import { create } from "zustand";
import { api } from "@/lib/api";

export interface ErrorPattern {
  knowledgeGap: number;
  reasoningError: number;
  dataInterpretation: number;
  timePressure: number;
}

export interface PerformanceMetrics {
  totalQuestionsAttempted: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
  avgTimePerQuestion: number;
  totalTimeSpenMinutes: number;
  attemptsByCategory: Record<string, { total: number; correct: number; accuracy: number }>;
  difficultyDistribution: Record<string, number>;
  recentTrend: number[];
}

export interface CognitiveProfile {
  userId: string;
  errorPatterns: ErrorPattern;
  strengthAreas: string[];
  weaknessAreas: string[];
  suggestedFocus: string[];
  confidenceCalibration: {
    overconfident: number;
    underconfident: number;
  };
}

export interface PerformanceTrendPoint {
  date: string;
  totalAttempts: number;
  correctAnswers: number;
  accuracy: number;
  avgTimeMs: number;
}

export interface DifficultyMetrics {
  easy: number;
  medium: number;
  hard: number;
  weighted: number;
}

interface AnalyticsState {
  metrics: PerformanceMetrics | null;
  cognitiveProfile: CognitiveProfile | null;
  trends: PerformanceTrendPoint[];
  difficultyMetrics: DifficultyMetrics | null;
  isLoading: boolean;
  error: string | null;

  fetchMetrics: (userId?: string) => Promise<PerformanceMetrics>;
  fetchCognitiveProfile: (userId?: string) => Promise<CognitiveProfile>;
  fetchTrends: (userId?: string, daysBack?: number) => Promise<PerformanceTrendPoint[]>;
  fetchDifficultyMetrics: (userId?: string) => Promise<DifficultyMetrics>;
  clearError: () => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  metrics: null,
  cognitiveProfile: null,
  trends: [],
  difficultyMetrics: null,
  isLoading: false,
  error: null,

  fetchMetrics: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response: any = await api.get(`/analytics/performance/metrics`);
      const metricsData = response?.data || response;
      set({ metrics: metricsData, isLoading: false });
      return metricsData;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to fetch metrics";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  fetchCognitiveProfile: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response: any = await api.get(`/analytics/cognitive-profile`);
      const profile = response?.data || response;
      set({ cognitiveProfile: profile, isLoading: false });
      return profile;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to fetch cognitive profile";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  fetchTrends: async (userId, daysBack) => {
    set({ isLoading: true, error: null });
    try {
      const response: any = await api.get(`/analytics/performance-trends?daysBack=${daysBack || 30}`);
      const trendsData = response?.data || response || [];
      set({ trends: trendsData, isLoading: false });
      return trendsData;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to fetch trends";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  fetchDifficultyMetrics: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response: any = await api.get(`/analytics/difficulty-weighted`);
      const diffData = response?.data || response;
      set({ difficultyMetrics: diffData, isLoading: false });
      return diffData;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to fetch difficulty metrics";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
