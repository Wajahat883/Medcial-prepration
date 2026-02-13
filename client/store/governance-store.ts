import { create } from "zustand";
import { api } from "@/lib/api";

interface Revision {
  _id: string;
  revisionId: string;
  questionId: string;
  content: string;
  status: string;
  createdAt: string;
}

interface GovernanceState {
  revisions: Record<string, Revision[]>;
  isLoading: boolean;
  fetchRevisions: (questionId: string) => Promise<void>;
  createRevision: (questionId: string, payload: any) => Promise<Revision>;
  restoreRevision: (questionId: string, versionId: string) => Promise<void>;
  retireQuestion: (questionId: string) => Promise<void>;
}

export const useGovernanceStore = create<GovernanceState>((set, get) => ({
  revisions: {},
  isLoading: false,

  fetchRevisions: async (questionId: string) => {
    set({ isLoading: true });
    try {
      const res: any = await api.get(`/questions/${questionId}/versions`);
      set((state) => ({ revisions: { ...state.revisions, [questionId]: res.data }, isLoading: false }));
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },

  createRevision: async (questionId: string, payload: any) => {
    const res: any = await api.post(`/questions/${questionId}/versions`, payload);
    // append locally
    set((state) => ({ revisions: { ...state.revisions, [questionId]: [...(state.revisions[questionId] || []), res.data] } }));
    return res.data;
  },

  restoreRevision: async (questionId: string, versionId: string) => {
    await api.post(`/questions/${questionId}/versions/${versionId}/restore`);
    // refetch revisions
    await get().fetchRevisions(questionId);
  },

  retireQuestion: async (questionId: string) => {
    await api.post(`/questions/${questionId}/retire`);
  },
}));
