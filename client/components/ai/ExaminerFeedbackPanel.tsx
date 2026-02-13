'use client';

import React from 'react';

interface FeedbackItem {
  type: 'error' | 'warning' | 'success' | 'info';
  title: string;
  description: string;
  reference?: string;
}

interface ExaminerFeedbackPanelProps {
  feedback: FeedbackItem | FeedbackItem[];
  examinerName?: string;
  questionDifficulty?: 'easy' | 'medium' | 'hard';
  commonMistakes?: string[];
  nextSteps?: string[];
}

/**
 * ExaminerFeedbackPanel
 * Displays examiner-style feedback in AMC/medical exam format
 * Provides constructive feedback on answer choice and reasoning
 */
export const ExaminerFeedbackPanel: React.FC<ExaminerFeedbackPanelProps> = ({
  feedback,
  examinerName = 'Medical Examiner',
  questionDifficulty = 'medium',
  commonMistakes = [],
  nextSteps = [],
}) => {
  const feedbackArray = Array.isArray(feedback) ? feedback : [feedback];

  const getIcon = (type: string) => {
    switch (type) {
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'text-red-900';
      case 'warning':
        return 'text-yellow-900';
      case 'success':
        return 'text-green-900';
      case 'info':
      default:
        return 'text-blue-900';
    }
  };

  const getDifficultyBadge = () => {
    const badges = {
      easy: { bg: 'bg-green-100', text: 'text-green-800', label: 'Easy' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Medium' },
      hard: { bg: 'bg-red-100', text: 'text-red-800', label: 'Hard' },
    };
    const badge = badges[questionDifficulty];
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
      {badge.label} Difficulty
    </span>;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="text-2xl">👨‍⚕️</span>
            {examinerName} Feedback
          </h3>
          {getDifficultyBadge()}
        </div>
        <p className="text-sm text-blue-100 mt-1">
          Professional assessment of your answer and clinical reasoning
        </p>
      </div>

      {/* Feedback Cards */}
      <div className="p-6 space-y-4">
        {feedbackArray.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border-2 ${getBgColor(item.type)}`}
          >
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">{getIcon(item.type)}</span>
              <div className="flex-grow">
                <h4 className={`font-semibold ${getTextColor(item.type)}`}>
                  {item.title}
                </h4>
                <p className={`text-sm mt-1 ${getTextColor(item.type)}`}>
                  {item.description}
                </p>
                {item.reference && (
                  <p className={`text-xs mt-2 italic opacity-75 ${getTextColor(item.type)}`}>
                    Reference: {item.reference}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Common Mistakes Section */}
      {commonMistakes.length > 0 && (
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>🔍</span>
            Common Mistakes in This Question
          </h4>
          <ul className="space-y-2">
            {commonMistakes.map((mistake, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex gap-2">
                <span className="text-red-500">•</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps Section */}
      {nextSteps.length > 0 && (
        <div className="border-t border-gray-200 px-6 py-4 bg-blue-50">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>📋</span>
            Recommended Next Steps
          </h4>
          <ol className="space-y-2">
            {nextSteps.map((step, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex gap-2">
                <span className="font-semibold text-blue-600 flex-shrink-0">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-3 bg-gray-50 text-xs text-gray-600">
        <p>
          💡 <strong>Tip:</strong> Review similar questions and reinforce the key clinical concepts
          mentioned in the feedback above. Consistent practice will improve your diagnostic accuracy.
        </p>
      </div>
    </div>
  );
};

export default ExaminerFeedbackPanel;