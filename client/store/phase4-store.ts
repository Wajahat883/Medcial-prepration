import { create } from 'zustand';

/**
 * Phase 4: Comprehensive Store
 * Manages all Phase 4 features: Anti-Piracy, UX, Monetization, Wellness, Post-Exam, Multi-Exam
 */

// Types
export interface PiracyViolation {
  _id: string;
  violationType: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface UXPreferences {
  noiseReductionEnabled: boolean;
  autoCollapseStems: boolean;
  highlightVitalsAndLabs: boolean;
  fontSize: 'small' | 'normal' | 'large';
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface PredictiveImpact {
  currentPassProbability: number;
  projectedPassProbability: number;
  improvementPercentage: number;
  estimatedStudyHours: number;
  timesSaved?: number;
  message?: string;
}

export interface WellnessData {
  riskLevel: 'low' | 'medium' | 'high';
  declineIndicators: {
    accuracyDeclining: boolean;
    timeDeclining: boolean;
    frequencyDeclining: boolean;
  };
  interventionMessage?: string;
  recommendations: string[];
}

export interface ExamData {
  _id: string;
  examId: string;
  displayName: string;
  description?: string;
  pasScore: number;
  totalQuestions: number;
  timeLimit: number;
  subjects: string[];
}

export interface ConversionMetrics {
  totalTeasersShown: number;
  totalUpsellClicks: number;
  totalConversions: number;
  ctcRate: string | number;
  conversionRate: string | number;
}

interface Phase4State {
  // Anti-Piracy
  violations: PiracyViolation[];
  loadingViolations: boolean;
  
  // UX Optimization
  uxPreferences: UXPreferences | null;
  loadingPreferences: boolean;
  noiseReductionEnabled: boolean;
  
  // Monetization
  predictiveImpact: PredictiveImpact | null;
  conversionMetrics: ConversionMetrics | null;
  loadingExternal: boolean;
  upsellVariant: string;
  
  // Wellness & Burnout
  wellness: WellnessData | null;
  loadingWellness: boolean;
  
  // Post-Exam
  lastExamFeedback: any | null;
  contentReport: any | null;
  
  // Multi-Exam
  availableExams: ExamData[];
  userExams: any[];
  primaryExam: ExamData | null;
  selectedExamFilter: string[];
  loadingExams: boolean;
  
  // Actions - Piracy
  setViolations: (violations: PiracyViolation[]) => void;
  addViolation: (violation: PiracyViolation) => void;
  fetchViolations: (daysBack?: number) => Promise<void>;
  
  // Actions - UX
  setUXPreferences: (prefs: UXPreferences) => void;
  updateUXPreferences: (updates: Partial<UXPreferences>) => Promise<void>;
  toggleNoiseReduction: (enabled: boolean) => void;
  
  // Actions - Monetization
  setPredictiveImpact: (impact: PredictiveImpact) => void;
  calculateImpact: (
    currentAccuracy: number,
    targetAccuracy: number,
    subject: string,
    daysUntilExam: number
  ) => Promise<void>;
  fetchConversionMetrics: () => Promise<void>;
  trackConversionEvent: (eventType: string, featureName: string) => Promise<void>;
  
  // Actions - Wellness
  setWellness: (data: WellnessData) => void;
  analyzeBurnoutRisk: () => Promise<void>;
  
  // Actions - Post-Exam
  submitPostExamFeedback: (examId: string, feedbackData: any) => Promise<void>;
  fetchContentReport: (examId: string) => Promise<void>;
  
  // Actions - Multi-Exam
  setAvailableExams: (exams: ExamData[]) => void;
  setUserExams: (exams: any[]) => void;
  fetchAvailableExams: () => Promise<void>;
  fetchUserExams: () => Promise<void>;
  selectExam: (examId: string, targetDate?: Date) => Promise<void>;
  switchPrimaryExam: (examId: string) => Promise<void>;
  setSelectedExamFilter: (subjects: string[]) => void;
  
  // Utility
  reset: () => void;
}

const initialState = {
  violations: [],
  loadingViolations: false,
  uxPreferences: null,
  loadingPreferences: false,
  noiseReductionEnabled: false,
  predictiveImpact: null,
  conversionMetrics: null,
  loadingExternal: false,
  upsellVariant: 'impact-focused',
  wellness: null,
  loadingWellness: false,
  lastExamFeedback: null,
  contentReport: null,
  availableExams: [],
  userExams: [],
  primaryExam: null,
  selectedExamFilter: [],
  loadingExams: false,
};

export const usePhase4Store = create<Phase4State>((set, get) => ({
  ...initialState,

  // Piracy Actions
  setViolations: (violations) => set({ violations }),
  addViolation: (violation) =>
    set((state) => ({ violations: [...state.violations, violation] })),
  
  fetchViolations: async (daysBack = 30) => {
    try {
      set({ loadingViolations: true });
      const response = await fetch(`/api/phase4/piracy/violations?days=${daysBack}`);
      if (!response.ok) throw new Error('Failed to fetch violations');
      const data = await response.json();
      set({ violations: data.data, loadingViolations: false });
    } catch (error) {
      console.error('Error fetching violations:', error);
      set({ loadingViolations: false });
    }
  },

  // UX Actions
  setUXPreferences: (prefs) => set({ uxPreferences: prefs }),
  
  updateUXPreferences: async (updates) => {
    try {
      set({ loadingPreferences: true });
      const response = await fetch('/api/phase4/ux/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update preferences');
      const data = await response.json();
      set({ uxPreferences: data.data, loadingPreferences: false });
    } catch (error) {
      console.error('Error updating preferences:', error);
      set({ loadingPreferences: false });
    }
  },
  
  toggleNoiseReduction: (enabled) => set({ noiseReductionEnabled: enabled }),

  // Monetization Actions
  setPredictiveImpact: (impact) => set({ predictiveImpact: impact }),
  
  calculateImpact: async (currentAccuracy, targetAccuracy, subject, daysUntilExam) => {
    try {
      set({ loadingExternal: true });
      const response = await fetch('/api/phase4/monetization/predictive-impact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentAccuracy,
          targetAccuracy,
          subjectName: subject,
          daysUntilExam,
        }),
      });
      if (!response.ok) throw new Error('Failed to calculate impact');
      const data = await response.json();
      set({ predictiveImpact: data.data, loadingExternal: false });
    } catch (error) {
      console.error('Error calculating impact:', error);
      set({ loadingExternal: false });
    }
  },
  
  fetchConversionMetrics: async () => {
    try {
      set({ loadingExternal: true });
      const response = await fetch('/api/phase4/monetization/metrics');
      if (!response.ok) throw new Error('Failed to fetch metrics');
      const data = await response.json();
      set({ conversionMetrics: data.data, loadingExternal: false });
    } catch (error) {
      console.error('Error fetching metrics:', error);
      set({ loadingExternal: false });
    }
  },
  
  trackConversionEvent: async (eventType, featureName) => {
    try {
      await fetch('/api/phase4/monetization/track-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType, featureName }),
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  },

  // Wellness Actions
  setWellness: (data) => set({ wellness: data }),
  
  analyzeBurnoutRisk: async () => {
    try {
      set({ loadingWellness: true });
      const response = await fetch('/api/phase4/wellness/burnout-analysis');
      if (!response.ok) throw new Error('Failed to analyze burnout');
      const data = await response.json();
      set({ wellness: data.data, loadingWellness: false });
    } catch (error) {
      console.error('Error analyzing burnout:', error);
      set({ loadingWellness: false });
    }
  },

  // Post-Exam Actions
  submitPostExamFeedback: async (examId, feedbackData) => {
    try {
      const response = await fetch('/api/phase4/feedback/post-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examId, ...feedbackData }),
      });
      if (!response.ok) throw new Error('Failed to submit feedback');
      const data = await response.json();
      set({ lastExamFeedback: data.data });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  },
  
  fetchContentReport: async (examId) => {
    try {
      const response = await fetch(`/api/phase4/feedback/content-report/${examId}`);
      if (!response.ok) throw new Error('Failed to fetch report');
      const data = await response.json();
      set({ contentReport: data.data });
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  },

  // Multi-Exam Actions
  setAvailableExams: (exams) => set({ availableExams: exams }),
  setUserExams: (exams) => set({ userExams: exams }),
  
  fetchAvailableExams: async () => {
    try {
      set({ loadingExams: true });
      const response = await fetch('/api/phase4/exams/available');
      if (!response.ok) throw new Error('Failed to fetch exams');
      const data = await response.json();
      set({ availableExams: Array.isArray(data.data) ? data.data : [], loadingExams: false });
    } catch (error) {
      console.error('Error fetching exams:', error);
      set({ loadingExams: false });
    }
  },
  
  fetchUserExams: async () => {
    try {
      set({ loadingExams: true });
      const response = await fetch('/api/phase4/exams/my-exams');
      if (!response.ok) throw new Error('Failed to fetch user exams');
      const data = await response.json();
      const exams = Array.isArray(data.data) ? data.data : [];
      const primary = exams.find((e: any) => e.isPrimary)?.examId;
      set({
        userExams: exams,
        primaryExam: primary,
        loadingExams: false,
      });
    } catch (error) {
      console.error('Error fetching user exams:', error);
      set({ loadingExams: false });
    }
  },
  
  selectExam: async (examId, targetDate) => {
    try {
      set({ loadingExams: true });
      const response = await fetch('/api/phase4/exams/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examId, targetExamDate: targetDate }),
      });
      if (!response.ok) throw new Error('Failed to select exam');
      get().fetchUserExams();
    } catch (error) {
      console.error('Error selecting exam:', error);
      set({ loadingExams: false });
    }
  },
  
  switchPrimaryExam: async (examId) => {
    try {
      set({ loadingExams: true });
      const response = await fetch('/api/phase4/exams/switch-primary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examId }),
      });
      if (!response.ok) throw new Error('Failed to switch exam');
      get().fetchUserExams();
    } catch (error) {
      console.error('Error switching exam:', error);
      set({ loadingExams: false });
    }
  },
  
  setSelectedExamFilter: (subjects) => set({ selectedExamFilter: subjects }),

  reset: () => set(initialState),
}));

export default usePhase4Store;