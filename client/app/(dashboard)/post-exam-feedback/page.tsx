'use client';

import { useEffect } from 'react';
import { usePhase4Store } from '@/store/phase4-store';
import { useExamFormStore } from '@/store/exam-form-store';
import { useFeedbackUIStore } from '@/store/feedback-ui-store';
import PostExamFeedbackForm from '@/components/wellness/PostExamFeedbackForm';

/**
 * Post-Exam Feedback & Content Analysis Page
 * Feedback collection, analysis, and content improvement reports
 */
export default function PostExamFeedbackPage() {
  const {
    userExams,
    lastExamFeedback,
    contentReport,
    submitPostExamFeedback,
    fetchContentReport,
    loadingExams,
  } = usePhase4Store();

  const { selectedExamId, setSelectedExamId } = useExamFormStore();
  const { successMessage, setSuccessMessage } = useFeedbackUIStore();

  useEffect(() => {
    if (Array.isArray(userExams) && userExams.length > 0 && !selectedExamId) {
      // Auto-select primary exam
      const primaryExam = userExams.find((e: any) => e.isPrimary);
      if (primaryExam) {
        setSelectedExamId(primaryExam._id);
      }
    }
  }, [userExams, selectedExamId, setSelectedExamId]);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Post-Exam Feedback & Analysis</h1>
        <p className="mt-2 text-gray-600">
          Share your exam experience to help us improve content and provide better insights
        </p>
      </div>

      {loadingExams ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading exams...</p>
          </div>
        </div>
      ) : !Array.isArray(userExams) || userExams.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">You haven't selected any exams yet.</p>
          <a
            href="/dashboard/exams"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Select an Exam
          </a>
        </div>
      ) : (
        <>
          {/* Exam Selection */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Exam</h2>
            <select
              value={selectedExamId || ''}
              onChange={(e) => {
                setSelectedExamId(e.target.value || null);
                fetchContentReport(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- Select an exam --</option>
              {userExams.map((exam) => (
                <option key={exam._id} value={exam._id}>
                  {exam.examId.toUpperCase()} {exam.isPrimary ? '(Primary)' : ''}
                </option>
              ))}
            </select>
          </section>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
              {successMessage}
            </div>
          )}

          {/* Feedback Form */}
          {selectedExamId && (
            <section>
              <PostExamFeedbackForm />
            </section>
          )}

          {/* Last Feedback Submission */}
          {lastExamFeedback && (
            <section className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">📝 Your Recent Feedback</h3>
              <div className="space-y-3">
                {lastExamFeedback.unfamiliarTopics && lastExamFeedback.unfamiliarTopics.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Unfamiliar Topics:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {lastExamFeedback.unfamiliarTopics.map((topic: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {lastExamFeedback.perceivedDifficulty && (
                  <div>
                    <p className="text-sm font-semibold text-blue-800">
                      Perceived Difficulty: <span className="font-normal">{lastExamFeedback.perceivedDifficulty}</span>
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Content Improvement Report */}
          {contentReport && (
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Content Improvement Report</h2>

              {/* Key Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Average Perceived Difficulty */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                  <p className="text-sm font-semibold text-orange-900 uppercase">Avg Perceived Difficulty</p>
                  <p className="text-2xl font-bold text-orange-900 mt-2">
                    {contentReport.avgPerceivedDifficulty?.toFixed(2) || 'N/A'}
                  </p>
                </div>

                {/* Average Actual Performance */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <p className="text-sm font-semibold text-green-900 uppercase">Avg Performance</p>
                  <p className="text-2xl font-bold text-green-900 mt-2">
                    {contentReport.avgActualPerformance?.toFixed(2)}%
                  </p>
                </div>

                {/* Time Pressure Level */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                  <p className="text-sm font-semibold text-red-900 uppercase">Time Pressure</p>
                  <p className="text-2xl font-bold text-red-900 mt-2">
                    {contentReport.avgTimePressure?.toFixed(2)}/5
                  </p>
                </div>
              </div>

              {/* Topic Analysis */}
              {contentReport.topUnfamiliarTopics && contentReport.topUnfamiliarTopics.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Top Unfamiliar Topics</h3>
                  <div className="space-y-2">
                    {contentReport.topUnfamiliarTopics.slice(0, 5).map((topic: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                        <span className="font-medium text-gray-900">{topic._id}</span>
                        <span className="text-sm bg-blue-100 text-blue-900 px-3 py-1 rounded-full">
                          {topic.count} mentions
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">📋 Recommendations</h3>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Focus on high-frequency unfamiliar topics identified above</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Review cases with time pressure to improve speed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Work on clarity of questions if rated low by users</span>
                  </li>
                </ul>
              </div>
            </section>
          )}

          {/* How It Works */}
          <section className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
            <h3 className="text-lg font-bold text-indigo-900 mb-3">💡 How Your Feedback Helps</h3>
            <ul className="space-y-2 text-sm text-indigo-800">
              <li className="flex items-start">
                <span className="mr-3">🎯</span>
                <span>
                  <strong>Content Improvement:</strong> Your feedback helps us identify and improve unclear or
                  outdated questions
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">📈</span>
                <span>
                  <strong>Personalization:</strong> We use your input to better personalize your study recommendations
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">🧠</span>
                <span>
                  <strong>Cognitive Analysis:</strong> Your experience data helps us understand learning patterns
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">⭐</span>
                <span>
                  <strong>Quality Assurance:</strong> Aggregate feedback ensures our questions are high-quality and fair
                </span>
              </li>
            </ul>
          </section>
        </>
      )}
    </div>
  );
}