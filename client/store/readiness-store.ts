import { create } from "zustand";
import { api } from "@/lib/api";

export interface ReadinessComponents {
  accuracy: number;
  time: number;
  stability: number;
  coverage: number;
  consistency: number;
}

export interface ReadinessScore {
  overall: number;
  components: ReadinessComponents;
  interpretation: string;
  recommendation: string;
  daysUntilReady?: number;
  lastUpdated: Date;
}

interface ReadinessHistory {
  score: number;
  interpretation: string;
  calculatedAt: Date;
  components: ReadinessComponents;
}

interface ReadinessTrend {
  average: number;
  trend: number;
  highest: number;
  lowest: number;
  dataPoints: number;
}

interface ReadinessState {
  score: ReadinessScore | null;
  breakdown: ReadinessComponents | null;
  history: ReadinessHistory[];
  trends: ReadinessTrend | null;
  report: any | null;
  isLoading: boolean;
  error: string | null;

  fetchScore: (userId?: string) => Promise<ReadinessScore>;
  fetchBreakdown: (userId?: string) => Promise<ReadinessComponents>;
  fetchHistory: (userId?: string) => Promise<ReadinessHistory[]>;
  fetchTrends: (userId?: string, daysBack?: number) => Promise<ReadinessTrend>;
  fetchReport: (userId?: string) => Promise<any>;
  clearError: () => void;
}

export const useReadinessStore = create<ReadinessState>((set) => ({
  score: null,
  breakdown: null,
  history: [],
  trends: null,
  report: null,
  isLoading: false,
  error: null,

  fetchScore: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response: any = await api.get(`/readiness/score/${userId || "me"}`);
      const scoreData = response?.data || response;
      set({ score: scoreData, isLoading: false });
      return scoreData;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to fetch readiness score";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  fetchBreakdown: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response: any = await api.get(`/readiness/breakdown/${userId || "me"}`);
      const data = response?.data || response;
      const components = data?.components || data;
      set({ breakdown: components, isLoading: false });
      return components;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to fetch breakdown";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  fetchHistory: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response: any = await api.get(`/readiness/history/${userId || "me"}`);
      const history = response?.data || response || [];
      set({ history, isLoading: false });
      return history;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to fetch history";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  fetchTrends: async (userId, daysBack) => {
    set({ isLoading: true, error: null });
    try {
      const response: any = await api.get(`/readiness/trends/${userId || "me"}?daysBack=${daysBack || 30}`);
      const data = response?.data || response;
      const trends = data?.summary || data;
      set({ trends, isLoading: false });
      return trends;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to fetch trends";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  fetchReport: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response: any = await api.get(`/readiness/report/${userId || "me"}`);
      const report = response?.data || response;
      set({ report, isLoading: false });
      return report;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to fetch report";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
