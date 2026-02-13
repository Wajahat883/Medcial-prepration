'use client';

import React, { useState } from 'react';

interface Exam {
  _id: string;
  examId: string;
  displayName: string;
  description?: string;
  pasScore: number;
  totalQuestions: number;
  timeLimit: number;
  subjects: string[];
}

/**
 * Exam Selector Component
 * Allows users to select or switch between different exams
 */
export const ExamSelector: React.FC<{
  availableExams: Exam[];
  userExams?: Array<{ examId: string; isPrimary: boolean }>;
  onSelect?: (examId: string) => void;
  onSwitch?: (examId: string) => void;
}> = ({ availableExams, userExams = [], onSelect, onSwitch }) => {
  const [selectedExam, setSelectedExam] = useState<string | null>(
    userExams.find((e) => e.isPrimary)?.examId || null
  );

  const getExamIcon = (examId: string) => {
    const icons: Record<string, string> = {
      'amc-mcq': '🇦🇺',
      'plab-1': '🇬🇧',
      'usmle-ck': '🇺🇸',
      'nzrex': '🇳🇿',
    };
    return icons[examId] || '📚';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <span>🎯</span> Select Your Exam
      </h2>
      <p className="text-gray-600 mb-6">Choose which medical exam you're preparing for</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {availableExams.map((exam) => {
          const isSelected = selectedExam === exam._id;
          const isPrimary = userExams.some((e) => e.examId === exam._id && e.isPrimary);

          return (
            <div
              key={exam._id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
              onClick={() => setSelectedExam(exam._id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getExamIcon(exam.examId)}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">{exam.displayName}</h4>
                    {isPrimary && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-semibold">
                        ✅ Primary Exam
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {exam.description && <p className="text-xs text-gray-600 mb-2">{exam.description}</p>}

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                <div>
                  <span className="font-semibold">Questions:</span> {exam.totalQuestions}
                </div>
                <div>
                  <span className="font-semibold">Time:</span> {exam.timeLimit} mins
                </div>
                <div>
                  <span className="font-semibold">Subjects:</span> {exam.subjects.length}
                </div>
                <div>
                  <span className="font-semibold">Pass:</span> {exam.pasScore}%
                </div>
              </div>

              {isSelected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.(exam._id);
                  }}
                  className="w-full px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
                >
                  {isPrimary ? 'Already Selected' : 'Select This Exam'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {userExams.length > 1 && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
          <h4 className="font-bold text-gray-900 mb-3">🔄 Your Exams</h4>
          <div className="space-y-2">
            {userExams.map((exam) => (
              <div key={exam.examId} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                <div>
                  <span className="font-semibold text-gray-900">{exam.examId}</span>
                  {exam.isPrimary && <span className="ml-2 text-xs text-green-600 font-bold">● PRIMARY</span>}
                </div>
                {!exam.isPrimary && (
                  <button
                    onClick={() => onSwitch?.(exam.examId)}
                    className="text-xs px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Switch
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Exam Subjects Filter Component
 */
export const ExamSubjectsFilter: React.FC<{
  subjects: string[];
  selectedSubjects: string[];
  onSelectionChange?: (subjects: string[]) => void;
}> = ({ subjects, selectedSubjects, onSelectionChange }) => {
  const handleToggle = (subject: string) => {
    const updated = selectedSubjects.includes(subject)
      ? selectedSubjects.filter((s) => s !== subject)
      : [...selectedSubjects, subject];
    onSelectionChange?.(updated);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">📚 Filter by Subject</h3>

      <div className="flex flex-wrap gap-2">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => handleToggle(subject)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
              selectedSubjects.includes(subject)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {subject}
            {selectedSubjects.includes(subject) && ' ✓'}
          </button>
        ))}
      </div>

      {selectedSubjects.length > 0 && (
        <button
          onClick={() => onSelectionChange?.([])}
          className="mt-4 text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
};

/**
 * Exam Statistics Component
 */
export const ExamStatistics: React.FC<{
  examName: string;
  stats: {
    totalUsers: number;
    completedUsers: number;
    passScore: number;
    totalQuestions: number;
    availableSubjects: number;
  };
}> = ({ examName, stats }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">📊 {examName} Statistics</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-blue-300">
          <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Total Users</p>
          <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-green-300">
          <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-600">{stats.completedUsers}</p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-purple-300">
          <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Pass Score</p>
          <p className="text-2xl font-bold text-purple-600">{stats.passScore}%</p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-orange-300">
          <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Questions</p>
          <p className="text-2xl font-bold text-orange-600">{stats.totalQuestions}</p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-red-300 md:col-span-2">
          <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Subjects</p>
          <p className="text-2xl font-bold text-red-600">{stats.availableSubjects}</p>
        </div>
      </div>
    </div>
  );
};

export default { ExamSelector, ExamSubjectsFilter, ExamStatistics };