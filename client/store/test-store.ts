import { create } from 'zustand';
import { api } from '@/lib/api';

interface TestConfig {
  questionCount: number;
  category?: string;
  duration: number;
}

interface TestState {
  currentTest: any | null;
  isLoading: boolean;
  startTest: (config: TestConfig) => Promise<string>;
  submitAnswer: (testId: string, questionIndex: number, answer: number) => Promise<void>;
  completeTest: (testId: string) => Promise<any>;
  abandonTest: (testId: string) => Promise<void>;
}

export const useTestStore = create<TestState>((set) => ({
  currentTest: null,
  isLoading: false,

  startTest: async (config: TestConfig) => {
    set({ isLoading: true });
    try {
      const response: any = await api.post('/tests/start', config);
      set({ currentTest: response, isLoading: false });
      return response.testId;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  submitAnswer: async (testId: string, questionIndex: number, answer: number) => {
    try {
      await api.post(`/tests/${testId}/answer`, { questionIndex, answer });
    } catch (error) {
      throw error;
    }
  },

  completeTest: async (testId: string) => {
    set({ isLoading: true });
    try {
      const response: any = await api.post(`/tests/${testId}/complete`);
      set({ currentTest: null, isLoading: false });
      return response;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  abandonTest: async (testId: string) => {
    try {
      await api.post(`/tests/${testId}/abandon`);
      set({ currentTest: null });
    } catch (error) {
      throw error;
    }
  },
}));
