/**
 * Shared Utility Functions for AMC MCQ Exam Preparation Platform
 * Used by both client and server
 */

import { DifficultyLevel, IAttempt, IQuestion, ITestSession } from '../types';

// ============================================================================
// Date Formatting Functions
// ============================================================================

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string | number, format: 'short' | 'medium' | 'long' = 'medium'): string {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    return 'Invalid date';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? 'short' : 'long',
    day: 'numeric'
  };

  if (format === 'long') {
    options.weekday = 'long';
  }

  return d.toLocaleDateString('en-AU', options);
}

/**
 * Format a date with time
 */
export function formatDateTime(date: Date | string | number, includeSeconds = false): string {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    return 'Invalid date';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  if (includeSeconds) {
    options.second = '2-digit';
  }

  return d.toLocaleString('en-AU', options);
}

/**
 * Format a date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string | number): string {
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

/**
 * Format a date to ISO string without milliseconds
 */
export function formatISODate(date: Date | string | number): string {
  const d = new Date(date);
  return d.toISOString().split('.')[0] + 'Z';
}

// ============================================================================
// Time Formatting Functions
// ============================================================================

/**
 * Format seconds to readable time string (HH:MM:SS or MM:SS)
 */
export function formatTime(seconds: number, showHours = true): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];
  
  if (showHours || hours > 0) {
    parts.push(hours.toString().padStart(2, '0'));
  }
  
  parts.push(minutes.toString().padStart(2, '0'));
  parts.push(secs.toString().padStart(2, '0'));

  return parts.join(':');
}

/**
 * Format seconds to a short duration string
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ${seconds % 60}s`;
  }

  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

/**
 * Calculate remaining time for a test
 */
export function calculateRemainingTime(startTime: Date | string, timeLimitSeconds: number): number {
  const start = new Date(startTime).getTime();
  const now = Date.now();
  const elapsed = Math.floor((now - start) / 1000);
  return Math.max(0, timeLimitSeconds - elapsed);
}

// ============================================================================
// Score Calculation Functions
// ============================================================================

/**
 * Calculate accuracy percentage
 */
export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Calculate average time per question
 */
export function calculateAverageTime(totalTimeSeconds: number, questionCount: number): number {
  if (questionCount === 0) return 0;
  return Math.round((totalTimeSeconds / questionCount) * 10) / 10;
}

/**
 * Calculate score based on correct answers
 */
export function calculateScore(correct: number, total: number, scale: { min: number; max: number } = { min: 0, max: 500 }): number {
  if (total === 0) return scale.min;
  const percentage = correct / total;
  const scoreRange = scale.max - scale.min;
  return Math.round(scale.min + (percentage * scoreRange));
}

/**
 * Calculate pass/fail status for AMC exam
 */
export function calculateAMCResult(score: number): { passed: boolean; margin: number } {
  const passMark = 250;
  return {
    passed: score >= passMark,
    margin: score - passMark
  };
}

/**
 * Calculate improvement rate between two scores
 */
export function calculateImprovement(previousScore: number, currentScore: number): number {
  if (previousScore === 0) return 0;
  return Math.round(((currentScore - previousScore) / previousScore) * 100);
}

/**
 * Calculate weighted score based on difficulty
 */
export function calculateWeightedScore(attempts: { isCorrect: boolean; difficulty: DifficultyLevel }[]): number {
  const weights = { easy: 1, medium: 1.5, hard: 2 };
  let totalWeight = 0;
  let earnedWeight = 0;

  attempts.forEach(attempt => {
    const weight = weights[attempt.difficulty];
    totalWeight += weight;
    if (attempt.isCorrect) {
      earnedWeight += weight;
    }
  });

  return totalWeight === 0 ? 0 : Math.round((earnedWeight / totalWeight) * 100);
}

// ============================================================================
// Percentile Calculation
// ============================================================================

/**
 * Calculate percentile rank
 */
export function calculatePercentile(value: number, dataset: number[]): number {
  if (dataset.length === 0) return 0;
  
  const sorted = [...dataset].sort((a, b) => a - b);
  const below = sorted.filter(v => v < value).length;
  const equal = sorted.filter(v => v === value).length;
  
  return Math.round(((below + 0.5 * equal) / sorted.length) * 100);
}

/**
 * Estimate AMC exam percentile from score
 */
export function estimateAMCPercentile(score: number): number {
  // This is an estimation based on typical AMC exam distributions
  if (score < 200) return 10;
  if (score < 220) return 25;
  if (score < 250) return 45;
  if (score < 280) return 65;
  if (score < 320) return 80;
  if (score < 360) return 90;
  return 95;
}

// ============================================================================
// Test Statistics Functions
// ============================================================================

/**
 * Calculate test session statistics
 */
export function calculateTestStats(session: ITestSession): {
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  accuracy: number;
  averageTimePerQuestion: number;
} {
  const answers = session.answers || {};
  const totalQuestions = session.totalQuestions;
  
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  // This would need actual question data to check correctness
  // For now, returning placeholder structure
  Object.values(answers).forEach(answer => {
    if (answer === null) {
      unansweredCount++;
    } else {
      // Would check against correct answer here
      correctCount++; // Placeholder
    }
  });

  unansweredCount = totalQuestions - Object.keys(answers).length;

  return {
    correctCount,
    incorrectCount,
    unansweredCount,
    accuracy: calculateAccuracy(correctCount, totalQuestions - unansweredCount),
    averageTimePerQuestion: calculateAverageTime(session.timeTakenSeconds, totalQuestions)
  };
}

// ============================================================================
// Validation Helpers
// ============================================================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate Australian mobile number
 */
export function isValidAustralianMobile(phone: string): boolean {
  const cleaned = phone.replace(/\s/g, '');
  const mobileRegex = /^04\d{8}$/;
  return mobileRegex.test(cleaned);
}

/**
 * Check if a value is within a valid range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Sanitize HTML content (basic)
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================================
// String Helpers
// ============================================================================

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitalize first letter of a string
 */
export function capitalizeFirst(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert camelCase to Title Case
 */
export function camelToTitleCase(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

/**
 * Generate a random alphanumeric code
 */
export function generateCode(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================================================
// Array Helpers
// ============================================================================

/**
 * Shuffle an array (Fisher-Yates algorithm)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get random items from an array
 */
export function getRandomItems<T>(array: T[], count: number): T[] {
  if (count >= array.length) return shuffleArray(array);
  return shuffleArray(array).slice(0, count);
}

/**
 * Group array items by a key
 */
export function groupBy<T>(array: T[], key: keyof T): { [key: string]: T[] } {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as { [key: string]: T[] });
}

/**
 * Remove duplicates from an array
 */
export function removeDuplicates<T>(array: T[]): T[] {
  return [...new Set(array)];
}

// ============================================================================
// Number Helpers
// ============================================================================

/**
 * Round to specified decimal places
 */
export function roundTo(value: number, decimals: number): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-AU');
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ============================================================================
// Storage Helpers (for client-side)
// ============================================================================

/**
 * Safe localStorage get
 */
export function storageGet<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Safe localStorage set
 */
export function storageSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Safe localStorage remove
 */
export function storageRemove(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage errors
  }
}

// ============================================================================
// Color Helpers
// ============================================================================

/**
 * Get color based on accuracy percentage
 */
export function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 80) return '#22C55E'; // Green
  if (accuracy >= 60) return '#F59E0B'; // Yellow
  return '#EF4444'; // Red
}

/**
 * Get color based on difficulty level
 */
export function getDifficultyColor(difficulty: DifficultyLevel): string {
  const colors: Record<DifficultyLevel, string> = {
    easy: '#22C55E',
    medium: '#F59E0B',
    hard: '#EF4444'
  };
  return colors[difficulty];
}

// ============================================================================
// Export for CSV/Excel
// ============================================================================

/**
 * Convert array of objects to CSV string
 */
export function convertToCsv<T extends Record<string, any>>(data: T[], headers?: string[]): string {
  if (data.length === 0) return '';

  const keys = headers || Object.keys(data[0]);
  const csvRows: string[] = [];

  // Header row
  csvRows.push(keys.join(','));

  // Data rows
  data.forEach(item => {
    const values = keys.map(key => {
      const value = item[key];
      if (value === null || value === undefined) return '';
      const stringValue = String(value);
      // Escape quotes and wrap in quotes if contains comma or newline
      if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    });
    csvRows.push(values.join(','));
  });

  return csvRows.join('\n');
}

/**
 * Download data as CSV file
 */
export function downloadCsv<T extends Record<string, any>>(data: T[], filename: string, headers?: string[]): void {
  if (typeof window === 'undefined') return;
  
  const csv = convertToCsv(data, headers);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  link.href = URL.createObjectURL(blob);
  link.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  link.click();
  
  URL.revokeObjectURL(link.href);
}
