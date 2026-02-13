import { create } from "zustand";
import { api } from "@/lib/api";

interface TopicRecall {
  topic: string;
  recallFrequency: number;
  last30DaysCount: number;
  last90DaysCount: number;
}

interface RecallState {
  heatmap: TopicRecall[];
  hotTopics: TopicRecall[];
  isLoading: boolean;
  fetchHeatmap: (params?: any) => Promise<void>;
  fetchHotTopics: (params?: any) => Promise<void>;
}

export const useRecallStore = create<RecallState>((set) => ({
  heatmap: [],
  hotTopics: [],
  isLoading: false,

  fetchHeatmap: async (params = {}) => {
    set({ isLoading: true });
    try {
      const query = new URLSearchParams(params).toString();
      const res: any = await api.get(`/recall/heatmap${query ? `?${query}` : ''}`);
      set({ heatmap: res?.data || res || [], isLoading: false });
    } catch (e) {
      set({ heatmap: [], isLoading: false });
      throw e;
    }
  },

  fetchHotTopics: async (params = {}) => {
    set({ isLoading: true });
    try {
      const query = new URLSearchParams(params).toString();
      const res: any = await api.get(`/recall/hot-topics${query ? `?${query}` : ''}`);
      set({ hotTopics: res?.data || res || [], isLoading: false });
    } catch (e) {
      set({ hotTopics: [], isLoading: false });
      throw e;
    }
  },
}));
