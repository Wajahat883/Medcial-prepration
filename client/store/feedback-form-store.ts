import { create } from 'zustand';

interface FeedbackFormState {
  feedbackTopics: string[];
  feedbackDifficulty: number;
  feedbackExperience: number;
  isSubmittingFeedback: boolean;
  
  setFeedbackTopics: (topics: string[]) => void;
  setFeedbackDifficulty: (difficulty: number) => void;
  setFeedbackExperience: (experience: number) => void;
  setIsSubmittingFeedback: (submitting: boolean) => void;
  resetFeedback: () => void;
}

export const useFeedbackFormStore = create<FeedbackFormState>((set) => ({
  feedbackTopics: [],
  feedbackDifficulty: 5,
  feedbackExperience: 5,
  isSubmittingFeedback: false,
  
  setFeedbackTopics: (topics) => set({ feedbackTopics: topics }),
  setFeedbackDifficulty: (difficulty) => set({ feedbackDifficulty: difficulty }),
  setFeedbackExperience: (experience) => set({ feedbackExperience: experience }),
  setIsSubmittingFeedback: (submitting) => set({ isSubmittingFeedback: submitting }),
  
  resetFeedback: () => set({
    feedbackTopics: [],
    feedbackDifficulty: 5,
    feedbackExperience: 5,
    isSubmittingFeedback: false,
  }),
}));
