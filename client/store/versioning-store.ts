import { create } from "zustand";
import { api } from "@/lib/api";

export interface VersionDiff {
  field: string;
  oldValue: any;
  newValue: any;
}

export interface Revision {
  _id: string;
  questionId: string;
  versionNumber: number;
  changes: VersionDiff[];
  changeLog: string;
  status: "draft" | "peer_review" | "senior_review" | "published";
  createdAt: Date;
  changedBy?: {
    email: string;
    name: string;
  };
}

export interface VersionHistory {
  revisions: Revision[];
  governance: any[];
  auditTrail: Array<{
    timestamp: Date;
    reviewer: { email: string; name: string };
    decision: string;
    feedback: string;
    stage: string;
  }>;
}

export interface PendingReview {
  stage: "peer_review" | "senior_review" | "medical_editor";
  count: number;
  revisions: Revision[];
}

interface VersioningState {
  versions: Record<string, VersionHistory>;
  pendingReview: PendingReview | null;
  questionsForReview: any[];
  isLoading: boolean;
  error: string | null;

  createRevision: (questionId: string, changes: Record<string, any>, changeLog: string) => Promise<Revision>;
  getVersionHistory: (questionId: string) => Promise<VersionHistory>;
  reviewRevision: (revisionId: string, decision: string, feedback: string) => Promise<void>;
  publishRevision: (revisionId: string) => Promise<void>;
  archiveQuestion: (questionId: string, reason: string) => Promise<void>;
  getPendingReview: (stage: string) => Promise<PendingReview>;
  getQuestionsForReReview: () => Promise<any[]>;
  scheduleReReview: (questionId: string, intervalDays: number) => Promise<void>;
  clearError: () => void;
}

export const useVersioningStore = create<VersioningState>((set, get) => ({
  versions: {},
  pendingReview: null,
  questionsForReview: [],
  isLoading: false,
  error: null,

  createRevision: async (questionId, changes, changeLog) => {
    set({ isLoading: true, error: null });
    try {
      const revision = await api.post<Revision>(`/questions/${questionId}/versions`, {
        changes,
        changeLog,
        status: "draft",
      });

      set({ isLoading: false });
      return revision;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to create revision";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  getVersionHistory: async (questionId) => {
    set({ isLoading: true, error: null });
    try {
      const history = await api.get<VersionHistory>(`/questions/${questionId}/history`);
      const versions = { ...get().versions, [questionId]: history };
      set({ versions, isLoading: false });
      return history;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to fetch version history";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  reviewRevision: async (revisionId, decision, feedback) => {
    set({ isLoading: true, error: null });
    try {
      await api.post(`/questions/revisions/${revisionId}/review`, { decision, feedback });
      set({ isLoading: false });
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to review revision";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  publishRevision: async (revisionId) => {
    set({ isLoading: true, error: null });
    try {
      await api.post(`/questions/revisions/${revisionId}/publish`, {});
      set({ isLoading: false });
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to publish revision";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  archiveQuestion: async (questionId, reason) => {
    set({ isLoading: true, error: null });
    try {
      await api.post(`/questions/${questionId}/archive`, { reason });
      set({ isLoading: false });
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to archive question";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  getPendingReview: async (stage) => {
    set({ isLoading: true, error: null });
    try {
      const pending = await api.get<any>(`/questions/admin/pending-review?stage=${stage}`);
      set({ pendingReview: pending, isLoading: false });
      return pending;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to fetch pending review";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  getQuestionsForReReview: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<{ questions: any[] }>(`/questions/admin/due-review`);
      const questions = (response as any).questions || [];
      set({ questionsForReview: questions, isLoading: false });
      return questions;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to fetch questions for review";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  scheduleReReview: async (questionId, intervalDays) => {
    set({ isLoading: true, error: null });
    try {
      await api.post(`/questions/${questionId}/schedule-review`, { intervalDays });
      set({ isLoading: false });
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to schedule review";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
