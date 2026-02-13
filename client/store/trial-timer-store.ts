import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TrialTimerState {
  trialStartTime: number | null;
  trialExpired: boolean;
  trialDeniedPayment: boolean;
  TRIAL_DURATION_MS: number; // 2 minutes in milliseconds
}

export interface TrialTimerStore extends TrialTimerState {
  startTrial: () => void;
  expireTrial: () => void;
  denyTrialPayment: () => void;
  resetTrial: () => void;
  getTimeRemaining: () => number;
  isTrialActive: () => boolean;
}

const TRIAL_DURATION_MS = 2 * 60 * 1000; // 2 minutes for testing (change to 7 * 24 * 60 * 60 * 1000 for 7 days)

const initialState: TrialTimerState = {
  trialStartTime: null,
  trialExpired: false,
  trialDeniedPayment: false,
  TRIAL_DURATION_MS,
};

export const useTrialTimerStore = create<TrialTimerStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      startTrial: () => {
        set({
          trialStartTime: Date.now(),
          trialExpired: false,
          trialDeniedPayment: false,
        });
      },

      expireTrial: () => {
        set({ trialExpired: true });
      },

      denyTrialPayment: () => {
        set({ trialDeniedPayment: true, trialExpired: true });
      },

      resetTrial: () => {
        set(initialState);
      },

      getTimeRemaining: () => {
        const state = get();
        if (!state.trialStartTime) return state.TRIAL_DURATION_MS;

        const elapsed = Date.now() - state.trialStartTime;
        const remaining = state.TRIAL_DURATION_MS - elapsed;

        return Math.max(0, remaining);
      },

      isTrialActive: () => {
        const state = get();
        if (state.trialExpired || state.trialDeniedPayment) return false;
        if (!state.trialStartTime) return false;

        const timeRemaining = state.getTimeRemaining();
        return timeRemaining > 0;
      },
    }),
    {
      name: "trial-timer-storage",
      partialize: (state) => ({
        trialStartTime: state.trialStartTime,
        trialExpired: state.trialExpired,
        trialDeniedPayment: state.trialDeniedPayment,
      }),
    },
  ),
);
