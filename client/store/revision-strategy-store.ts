import { create } from "zustand";
import { api } from "@/lib/api";

interface RevisionBucket {
  _id: string;
  bucketType: string;
  questions: string[];
  priorityLevel: number;
}

interface RevisionState {
  buckets: RevisionBucket[];
  isLoading: boolean;
  fetchBuckets: (userId?: string) => Promise<void>;
  generateBuckets: (userId?: string) => Promise<void>;
  scheduleReminder: (payload: any) => Promise<void>;
}

export const useRevisionStrategyStore = create<RevisionState>((set) => ({
  buckets: [],
  isLoading: false,

  fetchBuckets: async (userId) => {
    set({ isLoading: true });
    try {
      const res: any = await api.get(`/revision/buckets/${userId || 'me'}`);
      set({ buckets: res?.data || res || [], isLoading: false });
    } catch (e) {
      set({ buckets: [], isLoading: false });
      throw e;
    }
  },

  generateBuckets: async (userId) => {
    set({ isLoading: true });
    try {
      const res: any = await api.get(`/revision/buckets/${userId || 'me'}`);
      set({ buckets: res?.data || res || [], isLoading: false });
    } catch (e) {
      set({ buckets: [], isLoading: false });
      throw e;
    }
  },

  scheduleReminder: async (payload) => {
    await api.post('/revision/reminders', payload);
  },
}));

export default useRevisionStrategyStore;
