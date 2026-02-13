'use client';

import { useEffect } from 'react';
import { usePhase4Store } from '@/store/phase4-store';
import ExamSelector from '@/components/exam/ExamSelector';
import ExamSubjectsFilter from '@/components/exam/ExamSubjectsFilter';
import ExamStatistics from '@/components/exam/ExamStatistics';

/**
 * Exams Dashboard Page
 * Multi-exam management, selection, and subject filtering
 */
export default function ExamsPage() {
  const {
    availableExams,
    userExams,
    primaryExam,
    selectedExamFilter,
    loadingExams,
    fetchAvailableExams,
    fetchUserExams,
    selectExam,
    switchPrimaryExam,
    setSelectedExamFilter,
  } = usePhase4Store();

  useEffect(() => {
    fetchAvailableExams();
    fetchUserExams();
  }, []);

  // Get current exam subjects for filtering
  const currentExamSubjects = primaryExam?.subjects || [];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Exam Management</h1>
        <p className="mt-2 text-gray-600">
          Select your primary exam and manage multiple exam preparation paths
        </p>
      </div>

      {loadingExams ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading exams...</p>
          </div>
        </div>
      ) : !Array.isArray(availableExams) ? (
        <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600">Failed to load exams. Please refresh the page.</p>
        </div>
      ) : (
        <>
          {/* Exam Selection Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Exams</h2>
            <ExamSelector
              availableExams={availableExams}
              userExams={userExams}
              primaryExam={primaryExam?.examId || ''}
              onSelect={(examId: string, targetDate: Date) => selectExam(examId, targetDate)}
              onSwitch={(examId: string) => switchPrimaryExam(examId)}
            />
          </section>

          {/* Subjects Filter Section */}
          {currentExamSubjects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Subject Filters</h2>
              <ExamSubjectsFilter
                subjects={currentExamSubjects.map((subject: string) => ({
                  id: subject,
                  name: subject,
                }))}
                onFilter={(subjects: string[]) => setSelectedExamFilter(subjects)}
              />
              {selectedExamFilter.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <strong>Filtering by:</strong> {selectedExamFilter.join(', ')}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Exam Statistics Section */}
          {primaryExam && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {primaryExam.displayName} Statistics
              </h2>
              <ExamStatistics
                stats={{
                  total: primaryExam.totalQuestions || 0,
                  completed: 0,
                  averageScore: 0,
                  strength: 'N/A',
                  weakness: 'N/A',
                }}
              />
            </section>
          )}

          {/* Multi-Exam Info Card */}
          {Array.isArray(userExams) && userExams.length > 1 && (
            <section className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
              <h3 className="text-lg font-bold text-indigo-900 mb-3">📚 Multiple Exams Enrolled</h3>
              <p className="text-sm text-indigo-800 mb-4">
                You're preparing for {userExams.length} exams. Switch your primary exam to focus on different
                subjects and update your personalized study plan.
              </p>
              <div className="space-y-2">
                {userExams.map((exam) => (
                  <div key={exam._id} className="flex items-center justify-between bg-white p-3 rounded">
                    <div>
                      <p className="font-medium text-gray-900">
                        {availableExams.find((a) => a.examId === exam.examId)?.displayName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Target: {new Date(exam.targetExamDate).toLocaleDateString()}
                      </p>
                    </div>
                    {exam.isPrimary && (
                      <span className="text-xs font-bold px-3 py-1 bg-blue-200 text-blue-900 rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Getting Started */}
          {(!Array.isArray(userExams) || userExams.length === 0) && (
            <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-bold text-green-900 mb-3">🚀 Get Started</h3>
              <p className="text-sm text-green-800 mb-4">
                Select your primary exam above to begin your personalized study plan. You can add more exams
                later as needed.
              </p>
              <button
                onClick={() => {
                  document.querySelector('[data-exam-select]')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
              >
                Select Your First Exam
              </button>
            </section>
          )}
        </>
      )}
    </div>
  );
}