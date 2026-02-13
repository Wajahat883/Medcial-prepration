import { create } from "zustand";
import { api } from "@/lib/api";

export interface SecurityStatus {
  isSuspended: boolean;
  suspensionDetails: {
    reason: string;
    suspensionUntil: Date;
    createdAt: Date;
  } | null;
  violationSummary: {
    totalViolations: number;
    criticalViolations: number;
    highViolations: number;
    recentViolations: any[];
  };
  riskLevel: "low" | "medium" | "high" | "critical";
}

export interface ContentWatermark {
  watermarkToken: string;
  visibleMark: string;
  metadata: Record<string, any>;
}

interface SecurityState {
  tokens: Record<string, string>;
  watermarks: Record<string, ContentWatermark>;
  securityStatus: SecurityStatus | null;
  isLoading: boolean;
  error: string | null;
  canAccess: boolean;

  generateToken: (questionId: string, sessionId?: string, expiresInMinutes?: number) => Promise<string>;
  validateToken: (token: string) => Promise<boolean>;
  logViolation: (violationType: "copy_attempt" | "paste_attempt" | "screenshot" | "selection_attempt") => Promise<void>;
  checkAccess: () => Promise<boolean>;
  generateWatermark: (questionId: string) => Promise<ContentWatermark>;
  getSecurityStatus: () => Promise<SecurityStatus>;
  revokeAllTokens: () => Promise<void>;
  clearError: () => void;
}

export const useSecurityStore = create<SecurityState>((set, get) => ({
  tokens: {},
  watermarks: {},
  securityStatus: null,
  isLoading: false,
  error: null,
  canAccess: true,

  generateToken: async (questionId, sessionId, expiresInMinutes) => {
    set({ isLoading: true, error: null });
    try {
      const token = await api.post<string>('/security/generate-token', {
        questionId,
        sessionId,
        expiresInMinutes: expiresInMinutes || 60,
      });

      const tokens = { ...get().tokens, [questionId]: token };
      set({ tokens, isLoading: false });
      return token;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to generate token";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  validateToken: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const isValid = await api.post<boolean>('/security/validate-token', { token });
      set({ isLoading: false });
      return isValid;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to validate token";
      set({ isLoading: false, error: errorMsg });
      return false;
    }
  },

  logViolation: async (violationType) => {
    set({ isLoading: true, error: null });
    try {
      await api.post('/security/log-violation', { violationType });
      set({ isLoading: false });
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to log violation";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  checkAccess: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<{ canAccess: boolean }>('/security/check-access');
      const canAccess = response.canAccess;
      set({ canAccess, isLoading: false });
      return canAccess;
    } catch (error: any) {
      const errorMsg = error.response?.data?.data?.reason || "Access denied";
      set({ isLoading: false, error: errorMsg, canAccess: false });
      return false;
    }
  },

  generateWatermark: async (questionId) => {
    set({ isLoading: true, error: null });
    try {
      const watermark = await api.post<ContentWatermark>('/security/watermark', { questionId });
      const watermarks = { ...get().watermarks, [questionId]: watermark };
      set({ watermarks, isLoading: false });
      return watermark;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to generate watermark";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  getSecurityStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const status = await api.get<SecurityStatus>('/security/status');
      set({ securityStatus: status, isLoading: false });
      return status;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to fetch security status";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  revokeAllTokens: async () => {
    set({ isLoading: true, error: null });
    try {
      await api.post('/security/revoke-tokens', {});
      set({ tokens: {}, isLoading: false });
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to revoke tokens";
      set({ isLoading: false, error: errorMsg });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
