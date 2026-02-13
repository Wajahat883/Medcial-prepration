import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OnboardingState {
  step: number;
  selectedCountry: string | null;
  selectedUniversity: string | null;
  selectedExam: string | null;
  selectedPlan: "free" | "monthly" | "quarterly" | "yearly" | null;
  paymentIntentId: string | null;
  isLoading: boolean;
  error: string | null;
  onboardingComplete: boolean;
}

export interface OnboardingStore extends OnboardingState {
  setStep: (step: number) => void;
  setCountry: (country: string) => void;
  setUniversity: (university: string) => void;
  setExam: (exam: string) => void;
  setPlan: (plan: "free" | "monthly" | "quarterly" | "yearly") => void;
  setPaymentIntentId: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const initialState: OnboardingState = {
  step: 1,
  selectedCountry: null,
  selectedUniversity: null,
  selectedExam: null,
  selectedPlan: null,
  paymentIntentId: null,
  isLoading: false,
  error: null,
  onboardingComplete: false,
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step: number) => {
        set({ step });
      },

      setCountry: (country: string) => {
        set({ selectedCountry: country, error: null });
      },

      setUniversity: (university: string) => {
        set({ selectedUniversity: university, error: null });
      },

      setExam: (exam: string) => {
        set({ selectedExam: exam, error: null });
      },

      setPlan: (plan: "free" | "monthly" | "quarterly" | "yearly") => {
        set({ selectedPlan: plan, error: null });
      },

      setPaymentIntentId: (id: string) => {
        set({ paymentIntentId: id });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      completeOnboarding: () => {
        set({ onboardingComplete: true, step: 6 });
      },

      resetOnboarding: () => {
        set(initialState);
      },
    }),
    {
      name: "onboarding-storage",
      partialize: (state) => ({
        selectedCountry: state.selectedCountry,
        selectedUniversity: state.selectedUniversity,
        selectedExam: state.selectedExam,
        selectedPlan: state.selectedPlan,
        step: state.step,
      }),
    },
  ),
);
