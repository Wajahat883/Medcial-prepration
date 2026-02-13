'use client';

import React, { useEffect, useState } from 'react';
import { useAIStore } from '@/store/ai-store';

/**
 * Adaptive Revision Mode Page
 * Shows smart revision buckets and adaptive scheduling for exam preparation
 * Features prioritized question buckets and personalized revision schedule
 */
export default function RevisionModePage() {
  const {
    revisionBuckets,
    revisionSchedule,
    loadingBuckets,
    loadingSchedule,
    daysUntilExam,
    selectedBucketType,
    setSelectedBucketType,
    fetchRevisionBuckets,
    fetchRevisionSchedule,
    setDaysUntilExam,
  } = useAIStore();

  const [examsIn, setExamsIn] = useState(30);

  useEffect(() => {
    fetchRevisionBuckets();
    fetchRevisionSchedule(examsIn);
    setDaysUntilExam(examsIn);
  }, [examsIn, fetchRevisionBuckets, fetchRevisionSchedule, setDaysUntilExam]);

  const getBucketIcon = (type: string) => {
    switch (type) {
      case 'slow_correct':
        return '🐢';
      case 'incorrect_confident':
        return '❌';
      case 'high_yield_low_accuracy':
        return '🎯';
      case 'almost_correct':
        return '📝';
      default:
        return '📚';
    }
  };

  const getBucketColor = (type: string) => {
    switch (type) {
      case 'slow_correct':
        return 'from-yellow-500 to-orange-500';
      case 'incorrect_confident':
        return 'from-red-500 to-pink-500';
      case 'high_yield_low_accuracy':
        return 'from-purple-500 to-indigo-500';
      case 'almost_correct':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const isLoading = loadingBuckets || loadingSchedule;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your adaptive revision plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">🎯 Adaptive Revision Mode</h1>
        <p className="text-purple-100">
          Smart revision buckets and personalized schedule for maximum exam preparation
        </p>
      </div>

      {/* Exam Date Selector */}
      <div className="flex gap-4 items-center bg-white p-4 rounded-lg border border-gray-200">
        <label className="text-sm font-semibold text-gray-700">Exam in:</label>
        <input
          type="number"
          value={examsIn}
          onChange={(e) => setExamsIn(Math.max(1, parseInt(e.target.value) || 30))}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-20"
          min="1"
          max="365"
        />
        <span className="text-sm text-gray-600">days</span>
        <button
          onClick={() => fetchRevisionBuckets()}
          className="px-4 py-2 ml-auto bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
        >
          Regenerate Plan
        </button>
      </div>

      {/* Revision Buckets Overview */}
      {revisionBuckets && revisionBuckets.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">📦 Revision Buckets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {revisionBuckets.map((bucket, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${getBucketColor(bucket.type)} rounded-lg p-6 text-white cursor-pointer transition-transform hover:scale-105 ${
                  selectedBucketType === bucket.type ? 'ring-4 ring-white' : ''
                }`}
                onClick={() => setSelectedBucketType(bucket.type)}
              >
                <div className="text-4xl mb-2">{getBucketIcon(bucket.type)}</div>
                <h3 className="font-bold text-lg mb-1">
                  {bucket.type.replace(/_/g, ' ').toUpperCase()}
                </h3>
                <div className="space-y-1 text-sm mb-3">
                  <div>
                    <span className="opacity-90">Questions:</span>
                    <span className="font-bold ml-2">{bucket.questions.length}</span>
                  </div>
                  <div>
                    <span className="opacity-90">Session:</span>
                    <span className="font-bold ml-2">{bucket.suggestedSessionDuration}m</span>
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 bg-white bg-opacity-20 rounded-full inline-block border ${getPriorityBadge(bucket.priority)} border-opacity-50`}>
                  {bucket.priority.toUpperCase()} Priority
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            No revision buckets available yet. Solve more questions to generate your revision plan.
          </p>
        </div>
      )}

      {/* Selected Bucket Details */}
      {selectedBucketType && revisionBuckets && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {getBucketIcon(selectedBucketType)}{' '}
              {selectedBucketType.replace(/_/g, ' ').toUpperCase()}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {revisionBuckets.find((b) => b.type === selectedBucketType)?.reasonForInclusion}
            </p>
          </div>

          {revisionBuckets.find((b) => b.type === selectedBucketType)?.questions && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Questions in this bucket:</h4>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {revisionBuckets
                  .find((b) => b.type === selectedBucketType)
                  ?.questions.map((q, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                      <p className="text-gray-900 font-medium">{q.stem || 'Question'}</p>
                      {q.accuracy && (
                        <p className="text-xs text-gray-600 mt-1">
                          Accuracy: {(q.accuracy * 100).toFixed(0)}%
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Revision Schedule */}
      {revisionSchedule && revisionSchedule.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">📅 Your Revision Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {revisionSchedule.slice(0, 14).map((day, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-gray-900">Day {day.dayNumber}</h4>
                  <span className="text-sm font-semibold text-gray-600">
                    {day.estimatedDuration} mins
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Total Questions: <span className="font-semibold">{day.totalQuestions}</span>
                  </p>

                  {day.bucketsToReview.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-700 uppercase">Buckets to Review:</p>
                      <div className="flex flex-wrap gap-1">
                        {day.bucketsToReview.map((bucket, bidx) => (
                          <span
                            key={bidx}
                            className={`text-xs px-2 py-1 rounded-full border ${getPriorityBadge(bucket.priority)}`}
                          >
                            {getBucketIcon(bucket.type)} {bucket.type.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button className="w-full mt-4 px-3 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                  Start Day {day.dayNumber}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            Your revision schedule will appear here once buckets are generated.
          </p>
        </div>
      )}

      {/* Revision Tips */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-4">💡 Revision Tips</h3>
        <ul className="space-y-2 text-sm text-blue-900">
          <li className="flex gap-2">
            <span>🎯</span>
            <span>
              <strong>High Priority First:</strong> Focus on red buckets first as they contain your most challenging questions
            </span>
          </li>
          <li className="flex gap-2">
            <span>⏱️</span>
            <span>
              <strong>Session Durations:</strong> Follow the suggested session times to maintain focus and retention
            </span>
          </li>
          <li className="flex gap-2">
            <span>📈</span>
            <span>
              <strong>Adaptive Scheduling:</strong> The schedule spreads revision optimally for spaced repetition
            </span>
          </li>
          <li className="flex gap-2">
            <span>✅</span>
            <span>
              <strong>Mark as Mastered:</strong> When you consistently answer correctly, mark questions as mastered to remove them
              from your bucket
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}