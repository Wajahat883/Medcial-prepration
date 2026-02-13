import { create } from "zustand";
import { api } from "@/lib/api";

interface SessionToken {
  tokenId: string;
  expiresAt: string;
}

interface PiracyState {
  tokens: SessionToken[];
  isLoading: boolean;
  generateToken: (payload: any) => Promise<SessionToken>;
  validateToken: (tokenId: string) => Promise<boolean>;
  logViolation: (payload: any) => Promise<void>;
}

export const usePiracyProtectionStore = create<PiracyState>((set) => ({
  tokens: [],
  isLoading: false,

  generateToken: async (payload) => {
    const res: any = await api.post('/security/generate-token', payload);
      set((state) => ({ tokens: [...state.tokens, res] }));
      return res;
  },

  validateToken: async (tokenId) => {
    const res: any = await api.post('/security/validate-token', { tokenId });
    return res.success === true || res.data === true;
  },

  logViolation: async (payload) => {
    await api.post('/security/log-violation', payload);
  },
}));
