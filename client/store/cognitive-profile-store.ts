import { create } from "zustand";
import { api } from "@/lib/api";

interface CognitiveProfile {
  strengthAreas: string[];
  weaknessAreas: string[];
  errorPatterns: any;
  reasoningSpeedPercentile?: number;
}

interface CognitiveState {
  profile: CognitiveProfile | null;
  isLoading: boolean;
  fetchProfile: (userId?: string) => Promise<void>;
}

export const useCognitiveProfileStore = create<CognitiveState>((set) => ({
  profile: null,
  isLoading: false,

  fetchProfile: async (userId) => {
    set({ isLoading: true });
    try {
      const res: any = await api.get(`/ai/cognitive-profile${userId ? `?userId=${userId}` : ''}`);
      set({ profile: res?.data || res, isLoading: false });
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },
}));
