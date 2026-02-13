/**
 * Shared TypeScript Types for AMC MCQ Exam Preparation Platform
 * Used by both client and server
 */

// ============================================================================
// User Types
// ============================================================================

export type UserRole = 'student' | 'admin' | 'content_creator' | 'institution_admin';

export type SubscriptionTier = 'free' | 'monthly' | 'quarterly' | 'half_yearly' | 'annual';

export interface IUser {
  _id?: string;
  id?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
  examDate?: Date | string;
  subscriptionTier: SubscriptionTier;
  subscriptionExpiry?: Date | string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  preferences?: IUserPreferences;
  lastLogin?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IUserPreferences {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  pushNotifications: boolean;
  studyReminders: boolean;
  dailyGoal: number;
  defaultTestMode: TestMode;
}

export interface IUserStatistics {
  totalQuestionsAttempted: number;
  totalQuestionsCorrect: number;
  overallAccuracy: number;
  totalTimeSpent: number;
  testsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  percentileRank?: number;
  projectedScore?: number;
}

// ============================================================================
// Question Types
// ============================================================================

export type QuestionType = 'single_best_answer' | 'clinical_vignette' | 'image_based' | 'ecg_interpretation' | 'lab_interpretation' | 'drug_selection' | 'diagnosis' | 'management';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface IQuestionOption {
  label: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
  explanation?: string;
}

export interface IQuestionMedia {
  _id?: string;
  mediaType: 'image' | 'ecg' | 'lab_report' | 'diagram' | 'photo';
  mediaUrl: string;
  caption?: string;
  displayOrder: number;
}

export interface IQuestion {
  _id?: string;
  id?: string;
  questionStem: string;
  questionType: QuestionType;
  options: IQuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  teachingPoints?: string;
  wrongAnswerAnalysis?: {
    [key: string]: string;
  };
  references: string[];
  subject: string;
  topic: string;
  subtopic?: string;
  difficultyLevel: DifficultyLevel;
  isHighYield: boolean;
  tags?: string[];
  media?: IQuestionMedia[];
  statistics?: IQuestionStatistics;
  createdBy?: string;
  reviewedBy?: string;
  isActive: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IQuestionStatistics {
  timesAttempted: number;
  timesCorrect: number;
  correctRate: number;
  averageTimeSpent: number;
}

// ============================================================================
// Subject & Topic Types
// ============================================================================

export interface ISubject {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  iconUrl?: string;
  displayOrder: number;
  color?: string;
  isActive: boolean;
  topics?: ITopic[];
  questionCount?: number;
}

export interface ITopic {
  _id?: string;
  id?: string;
  subjectId: string;
  name: string;
  description?: string;
  parentTopicId?: string;
  displayOrder: number;
  isActive: boolean;
  subtopics?: ITopic[];
  questionCount?: number;
}

// ============================================================================
// Test Session Types
// ============================================================================

export type TestMode = 'tutor' | 'timed' | 'practice_test' | 'quick_quiz' | 'review';

export type TestType = 'custom' | 'mock_full' | 'mock_half' | 'mock_subject' | 'mock_rapid' | 'quick_quiz';

export type TestStatus = 'in_progress' | 'completed' | 'paused' | 'abandoned';

export interface ITestSessionSettings {
  numberOfQuestions: number;
  subjects: string[];
  topics?: string[];
  difficultyLevels: DifficultyLevel[];
  questionStatusFilter?: 'unused' | 'incorrect' | 'marked' | 'all';
  timeLimit?: number;
  showExplanations?: boolean;
  allowReview?: boolean;
  highYieldOnly?: boolean;
  imageBasedOnly?: boolean;
}

export interface ITestSession {
  _id?: string;
  id?: string;
  userId: string;
  testType: TestType;
  testMode: TestMode;
  settings: ITestSessionSettings;
  status: TestStatus;
  questions: string[] | IQuestion[];
  answers: { [questionId: string]: 'A' | 'B' | 'C' | 'D' | 'E' | null };
  markedQuestions: string[];
  timeSpentPerQuestion: { [questionId: string]: number };
  totalQuestions: number;
  correctAnswers?: number;
  incorrectAnswers?: number;
  unanswered?: number;
  scorePercentage?: number;
  timeTakenSeconds: number;
  timeLimitSeconds?: number;
  startedAt: Date | string;
  completedAt?: Date | string;
  pausedAt?: Date | string;
  resumedAt?: Date | string;
}

// ============================================================================
// Attempt Types
// ============================================================================

export interface IAttempt {
  _id?: string;
  id?: string;
  userId: string;
  questionId: string;
  testSessionId?: string;
  selectedOption: 'A' | 'B' | 'C' | 'D' | 'E' | null;
  isCorrect: boolean;
  timeSpentSeconds: number;
  isMarked: boolean;
  attemptMode: TestMode;
  attemptedAt: Date | string;
}

export interface IAttemptHistory {
  questionId: string;
  attempts: IAttempt[];
  totalAttempts: number;
  correctCount: number;
  lastAttemptedAt: Date | string;
}

// ============================================================================
// Bookmark & Notes Types
// ============================================================================

export interface IBookmark {
  _id?: string;
  id?: string;
  userId: string;
  questionId: string;
  folderName: string;
  notes?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface IBookmarkFolder {
  name: string;
  count: number;
}

export interface IUserNote {
  _id?: string;
  id?: string;
  userId: string;
  questionId: string;
  noteContent: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface ISubjectPerformance {
  subject: string;
  subjectId: string;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;
  averageTimePerQuestion: number;
  trend: 'improving' | 'declining' | 'stable';
}

export interface ITopicPerformance {
  topic: string;
  topicId: string;
  subject: string;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;
  strength: 'strong' | 'moderate' | 'weak';
}

export interface IPerformanceTrend {
  date: string;
  questionsAttempted: number;
  accuracy: number;
  averageTimePerQuestion: number;
}

export interface ITimeAnalytics {
  averageTimePerQuestion: number;
  totalTimeSpent: number;
  timeTrends: {
    date: string;
    timeSpent: number;
  }[];
  slowestQuestions: string[];
  fastestQuestions: string[];
}

export interface IAnalytics {
  overall: {
    totalQuestionsAttempted: number;
    totalQuestionsCorrect: number;
    overallAccuracy: number;
    percentileRank?: number;
    projectedScore?: number;
    testsCompleted: number;
    currentStreak: number;
  };
  subjectPerformance: ISubjectPerformance[];
  topicPerformance: ITopicPerformance[];
  performanceTrends: IPerformanceTrend[];
  timeAnalytics: ITimeAnalytics;
  weakAreas: string[];
  recommendedTopics: string[];
}

export interface IComparisonData {
  userAccuracy: number;
  peerAverageAccuracy: number;
  userPercentile: number;
  subjectComparisons: {
    subject: string;
    userAccuracy: number;
    peerAverageAccuracy: number;
  }[];
}

// ============================================================================
// Forum Types
// ============================================================================

export interface IForumPost {
  _id?: string;
  id?: string;
  questionId?: string;
  userId: string;
  user?: IUser;
  parentPostId?: string;
  content: string;
  upvotes: number;
  downvotes: number;
  isBestAnswer: boolean;
  replies?: IForumPost[];
  createdAt: Date | string;
  updatedAt: Date | string;
  isActive: boolean;
}

// ============================================================================
// Subscription Types
// ============================================================================

export interface ISubscriptionPlan {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  durationDays: number;
  priceAUD: number;
  features: string[];
  isActive: boolean;
  displayOrder: number;
}

export interface ISubscription {
  _id?: string;
  id?: string;
  userId: string;
  planId: string;
  plan?: ISubscriptionPlan;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startedAt: Date | string;
  expiresAt: Date | string;
  cancelledAt?: Date | string;
  paymentMethod?: string;
  stripeSubscriptionId?: string;
  createdAt?: Date | string;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: IApiMeta;
}

export interface IApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface IApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: IApiMeta;
}

// ============================================================================
// Auth Types
// ============================================================================

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ILoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface IRegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  examDate?: Date | string;
}

export interface IPasswordResetData {
  token: string;
  newPassword: string;
}

export interface IChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

// ============================================================================
// Study Planner Types
// ============================================================================

export interface IStudyPlan {
  _id?: string;
  id?: string;
  userId: string;
  examDate: Date | string;
  dailyGoal: number;
  subjects: IStudyPlanSubject[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IStudyPlanSubject {
  subject: string;
  subjectId: string;
  startDate: Date | string;
  endDate: Date | string;
  questionsPerDay: number;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

// ============================================================================
// Notification Types
// ============================================================================

export interface INotification {
  _id?: string;
  id?: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'reminder';
  isRead: boolean;
  link?: string;
  createdAt: Date | string;
}

// ============================================================================
// Search & Filter Types
// ============================================================================

export interface IQuestionFilter {
  subjects?: string[];
  topics?: string[];
  difficultyLevels?: DifficultyLevel[];
  questionTypes?: QuestionType[];
  isHighYield?: boolean;
  hasMedia?: boolean;
  tags?: string[];
  excludeAttempted?: boolean;
  excludeCorrect?: boolean;
  searchQuery?: string;
}

export interface ISearchResult {
  questions: IQuestion[];
  meta: IApiMeta;
}
