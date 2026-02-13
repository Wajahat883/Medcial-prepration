import { create } from 'zustand';

interface FeedbackUIState {
  successMessage: string;
  setSuccessMessage: (message: string) => void;
  clearSuccessMessage: () => void;
}

export const useFeedbackUIStore = create<FeedbackUIState>((set) => ({
  successMessage: '',
  
  setSuccessMessage: (message) => {
    set({ successMessage: message });
    // Auto-clear after 5 seconds
    setTimeout(() => set({ successMessage: '' }), 5000);
  },
  
  clearSuccessMessage: () => set({ successMessage: '' }),
}));
