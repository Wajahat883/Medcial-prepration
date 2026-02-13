import { create } from 'zustand';

interface ExamFormState {
  selectedExamId: string | null;
  selectedSubjects: string[];
  isLoadingSubjects: boolean;
  setSelectedExamId: (examId: string | null) => void;
  setSelectedSubjects: (subjects: string[]) => void;
  setIsLoadingSubjects: (loading: boolean) => void;
}

export const useExamFormStore = create<ExamFormState>((set) => ({
  selectedExamId: null,
  selectedSubjects: [],
  isLoadingSubjects: false,
  
  setSelectedExamId: (examId) => set({ selectedExamId: examId }),
  setSelectedSubjects: (subjects) => set({ selectedSubjects: subjects }),
  setIsLoadingSubjects: (loading) => set({ isLoadingSubjects: loading }),
}));
