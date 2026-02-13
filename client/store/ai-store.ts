import { create } from 'zustand';

/**
 * Phase 3 AI Store
 * Manages state for cognitive analysis, revision planning, and structured explanations
 */

export interface ErrorAnalysis {
  errorType: 'Knowledge Gap' | 'Reasoning Error' | 'Data Interpretation' | 'Time Pressure';
  confidence: number;
  reasoning: string;
  questionId: string;
}

export interface CognitivePattern {
  errorType: string;
  frequency: number;
  impact: 'high' | 'medium' | 'low';
  examples: string[];
}

export interface CognitiveProfile {
  userId: string;
  patterns: CognitivePattern[];
  stretchAreas: string[];
  strengthAreas: string[];
  recommendations: string[];
  lastUpdatedAt: Date;
}

export interface RevisionBucket {
  type: 'slow_correct' | 'incorrect_confident' | 'high_yield_low_accuracy' | 'almost_correct';
  priority: 'high' | 'medium' | 'low';
  questions: Question[];
  suggestedSessionDuration: number; // minutes
  reasonForInclusion: string;
}

export interface Question {
  id: string;
  stem: string;
  correctAnswer: string;
  userAnswer?: string;
  accuracy?: number;
  timeTaken?: number;
}

export interface RevisionScheduleDay {
  dayNumber: number;
  bucketsToReview: RevisionBucket[];
  totalQuestions: number;
  estimatedDuration: number;
}

export interface ExplanationSection {
  presentation?: string[];
  differential?: Array<{ condition: string; probability: 'high' | 'medium' | 'low' }>;
  discriminators?: string[];
  investigation?: { required: string[]; optional: string[] };
  diagnosis?: string;
  management?: string[];
}

export interface StructuredExplanation {
  questionId: string;
  sections: ExplanationSection;
  decisionTree?: { root: any };
  examinerFeedback?: string;
  lastUpdatedAt: Date;
}

export interface ExaminerFeedback {
  title: string;
  description: string;
  type: 'error' | 'warning' | 'success' | 'info';
  reference?: string;
}

interface AIState {
  // Error Analysis
  currentError: ErrorAnalysis | null;
  analyzingError: boolean;
  errorHistory: ErrorAnalysis[];

  // Cognitive Profile
  cognitiveProfile: CognitiveProfile | null;
  loadingProfile: boolean;

  // Revision Buckets
  revisionBuckets: RevisionBucket[] | null;
  loadingBuckets: boolean;
  selectedBucketType: string | null;

  // Revision Schedule
  revisionSchedule: RevisionScheduleDay[] | null;
  loadingSchedule: boolean;
  daysUntilExam: number;

  // Structured Explanation
  currentExplanation: StructuredExplanation | null;
  loadingExplanation: boolean;

  // Examiner Feedback
  examinerFeedback: ExaminerFeedback[] | null;
  loadingFeedback: boolean;

  // Actions
  setCurrentError: (error: ErrorAnalysis | null) => void;
  addErrorToHistory: (error: ErrorAnalysis) => void;
  clearErrorHistory: () => void;

  setCognitiveProfile: (profile: CognitiveProfile | null) => void;
  setLoadingProfile: (loading: boolean) => void;

  setRevisionBuckets: (buckets: RevisionBucket[] | null) => void;
  setLoadingBuckets: (loading: boolean) => void;
  setSelectedBucketType: (type: string | null) => void;
  getRevisionBucketByType: (type: string) => RevisionBucket | undefined;

  setRevisionSchedule: (schedule: RevisionScheduleDay[] | null) => void;
  setLoadingSchedule: (loading: boolean) => void;
  setDaysUntilExam: (days: number) => void;
  getScheduleForDay: (dayNumber: number) => RevisionScheduleDay | undefined;

  setCurrentExplanation: (explanation: StructuredExplanation | null) => void;
  setLoadingExplanation: (loading: boolean) => void;

  setExaminerFeedback: (feedback: ExaminerFeedback[] | null) => void;
  setLoadingFeedback: (loading: boolean) => void;

  // API functions
  fetchCognitiveProfile: (daysBack?: number) => Promise<void>;
  fetchRevisionBuckets: (limit?: number) => Promise<void>;
  fetchRevisionSchedule: (daysUntilExam?: number) => Promise<void>;
  fetchStructuredExplanation: (questionId: string) => Promise<void>;
  fetchExaminerFeedback: (questionId: string, userAnswer: string, correctAnswer: string) => Promise<void>;
  analyzeError: (questionId: string, userAnswer: string, correctAnswer: string, timeTaken: number) => Promise<void>;
  markQuestionMastered: (questionId: string) => Promise<void>;

  // Utility
  reset: () => void;
}

const initialState = {
  currentError: null,
  analyzingError: false,
  errorHistory: [],
  cognitiveProfile: null,
  loadingProfile: false,
  revisionBuckets: null,
  loadingBuckets: false,
  selectedBucketType: null,
  revisionSchedule: null,
  loadingSchedule: false,
  daysUntilExam: 30,
  currentExplanation: null,
  loadingExplanation: false,
  examinerFeedback: null,
  loadingFeedback: false,
};

export const useAIStore = create<AIState>((set, get) => ({
  ...initialState,

  setCurrentError: (error) => set({ currentError: error }),
  addErrorToHistory: (error) =>
    set((state) => ({
      errorHistory: [...state.errorHistory, error],
    })),
  clearErrorHistory: () => set({ errorHistory: [] }),

  setCognitiveProfile: (profile) => set({ cognitiveProfile: profile }),
  setLoadingProfile: (loading) => set({ loadingProfile: loading }),

  setRevisionBuckets: (buckets) => set({ revisionBuckets: buckets }),
  setLoadingBuckets: (loading) => set({ loadingBuckets: loading }),
  setSelectedBucketType: (type) => set({ selectedBucketType: type }),
  getRevisionBucketByType: (type) => {
    const buckets = get().revisionBuckets;
    return buckets?.find((b) => b.type === type as any);
  },

  setRevisionSchedule: (schedule) => set({ revisionSchedule: schedule }),
  setLoadingSchedule: (loading) => set({ loadingSchedule: loading }),
  setDaysUntilExam: (days) => set({ daysUntilExam: days }),
  getScheduleForDay: (dayNumber) => {
    const schedule = get().revisionSchedule;
    return schedule?.find((day) => day.dayNumber === dayNumber);
  },

  setCurrentExplanation: (explanation) => set({ currentExplanation: explanation }),
  setLoadingExplanation: (loading) => set({ loadingExplanation: loading }),

  setExaminerFeedback: (feedback) => set({ examinerFeedback: feedback }),
  setLoadingFeedback: (loading) => set({ loadingFeedback: loading }),

  // API Functions
  fetchCognitiveProfile: async (daysBack = 30) => {
    try {
      set({ loadingProfile: true });
      const response = await fetch(`/api/ai/cognitive-profile?daysBack=${daysBack}`);
      if (!response.ok) throw new Error('Failed to fetch cognitive profile');
      const data = await response.json();
      set({
        cognitiveProfile: data.data,
        loadingProfile: false,
      });
    } catch (error) {
      console.error('Error fetching cognitive profile:', error);
      set({ loadingProfile: false });
    }
  },

  fetchRevisionBuckets: async (limit = 100) => {
    try {
      set({ loadingBuckets: true });
      const response = await fetch(`/api/ai/revision-buckets?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch revision buckets');
      const data = await response.json();
      set({
        revisionBuckets: data.data,
        loadingBuckets: false,
      });
    } catch (error) {
      console.error('Error fetching revision buckets:', error);
      set({ loadingBuckets: false });
    }
  },

  fetchRevisionSchedule: async (daysUntilExam = 30) => {
    try {
      set({ loadingSchedule: true, daysUntilExam });
      const response = await fetch(`/api/ai/revision-schedule?daysUntilExam=${daysUntilExam}`);
      if (!response.ok) throw new Error('Failed to fetch revision schedule');
      const data = await response.json();
      set({
        revisionSchedule: data.data,
        loadingSchedule: false,
      });
    } catch (error) {
      console.error('Error fetching revision schedule:', error);
      set({ loadingSchedule: false });
    }
  },

  fetchStructuredExplanation: async (questionId) => {
    try {
      set({ loadingExplanation: true });
      const response = await fetch(`/api/ai/explanations/${questionId}`);
      if (!response.ok) throw new Error('Failed to fetch explanation');
      const data = await response.json();
      set({
        currentExplanation: data.data,
        loadingExplanation: false,
      });
    } catch (error) {
      console.error('Error fetching explanation:', error);
      set({ loadingExplanation: false });
    }
  },

  fetchExaminerFeedback: async (questionId, userAnswer, correctAnswer) => {
    try {
      set({ loadingFeedback: true });
      const response = await fetch('/api/ai/examiner-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, userAnswer, correctAnswer }),
      });
      if (!response.ok) throw new Error('Failed to fetch examiner feedback');
      const data = await response.json();
      set({
        examinerFeedback: Array.isArray(data.data.feedback)
          ? data.data.feedback
          : [data.data.feedback],
        loadingFeedback: false,
      });
    } catch (error) {
      console.error('Error fetching examiner feedback:', error);
      set({ loadingFeedback: false });
    }
  },

  analyzeError: async (questionId, userAnswer, correctAnswer, timeTaken) => {
    try {
      set({ analyzingError: true });
      const response = await fetch('/api/ai/analyze-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId,
          userAnswer,
          correctAnswer,
          timeTaken,
        }),
      });
      if (!response.ok) throw new Error('Failed to analyze error');
      const data = await response.json();
      const error: ErrorAnalysis = data.data;
      set((state) => ({
        currentError: error,
        errorHistory: [...state.errorHistory, error],
        analyzingError: false,
      }));
    } catch (error) {
      console.error('Error analyzing error:', error);
      set({ analyzingError: false });
    }
  },

  markQuestionMastered: async (questionId) => {
    try {
      const response = await fetch('/api/ai/mark-mastered', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId }),
      });
      if (!response.ok) throw new Error('Failed to mark question as mastered');
      // Optionally refetch revision buckets after marking as mastered
      get().fetchRevisionBuckets();
    } catch (error) {
      console.error('Error marking question as mastered:', error);
    }
  },

  reset: () => set(initialState),
}));

export default useAIStore;