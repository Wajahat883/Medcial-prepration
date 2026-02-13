'use client';

import React, { useEffect, useState } from 'react';
import { useAIStore } from '@/store/ai-store';
import { DecisionTreeComponent } from '@/components/ai/DecisionTreeComponent';
import { ExaminerFeedbackPanel } from '@/components/ai/ExaminerFeedbackPanel';
import { AlgorithmComparisonTable } from '@/components/ai/AlgorithmComparisonTable';

/**
 * Guided Explanations Page
 * Comprehensive view of structured explanations with decision trees, examiner feedback, and differential diagnosis comparison
 * Shows the full clinical reasoning pathway for a question
 */
export default function GuidedExplanationsPage() {
  const {
    currentExplanation,
    examinerFeedback,
    loadingExplanation,
    loadingFeedback,
    fetchStructuredExplanation,
    fetchExaminerFeedback,
  } = useAIStore();

  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'decision-tree' | 'feedback' | 'differential'>('overview');

  const handleLoadExplanation = () => {
    if (selectedQuestionId) {
      fetchStructuredExplanation(selectedQuestionId);
    }
  };

  const handleLoadFeedback = () => {
    if (selectedQuestionId && userAnswer && correctAnswer) {
      fetchExaminerFeedback(selectedQuestionId, userAnswer, correctAnswer);
    }
  };

  // Sample algorithm comparison data (would come from backend)
  const sampleAlgorithms = [
    {
      name: 'Diagnosis A',
      description: 'Most likely diagnosis based on patient presentation',
      probability: 'high' as const,
      keyFeatures: ['Feature 1', 'Feature 2', 'Feature 3'],
      requiredTests: ['Test A', 'Test B'],
      management: 'First-line treatment approach',
      advantages: ['Fast diagnosis', 'Cost-effective'],
      disadvantages: ['May need confirmation'],
    },
    {
      name: 'Diagnosis B',
      description: 'Important differential diagnosis to consider',
      probability: 'medium' as const,
      keyFeatures: ['Feature X', 'Feature Y', 'Feature Z'],
      requiredTests: ['Test C', 'Test D', 'Test E'],
      management: 'Alternative treatment approach',
      advantages: ['Comprehensive approach'],
      disadvantages: ['More expensive'],
    },
    {
      name: 'Diagnosis C',
      description: 'Less common but important to rule out',
      probability: 'low' as const,
      keyFeatures: ['Feature P', 'Feature Q'],
      requiredTests: ['Test F'],
      management: 'Specialized management needed',
      advantages: ['Good prognosis if caught early'],
      disadvantages: ['Rare presentation'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">📚 Guided Clinical Explanations</h1>
        <p className="text-indigo-100">
          Comprehensive structured explanations with decision trees and clinical reasoning pathways
        </p>
      </div>

      {/* Question Input Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Question Selection</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Question ID:</label>
            <input
              type="text"
              value={selectedQuestionId || ''}
              onChange={(e) => setSelectedQuestionId(e.target.value)}
              placeholder="Enter question ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Answer:</label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correct Answer:</label>
              <input
                type="text"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Enter correct answer"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleLoadExplanation}
              disabled={!selectedQuestionId}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loadingExplanation ? 'Loading...' : 'Load Explanation'}
            </button>
            <button
              onClick={handleLoadFeedback}
              disabled={!selectedQuestionId || !userAnswer || !correctAnswer}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loadingFeedback ? 'Loading...' : 'Get Examiner Feedback'}
            </button>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      {currentExplanation && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 bg-gray-50 p-2 gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded font-semibold text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                📋 Overview
              </button>
              <button
                onClick={() => setActiveTab('decision-tree')}
                className={`px-4 py-2 rounded font-semibold text-sm transition-colors ${
                  activeTab === 'decision-tree'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                🌳 Decision Tree
              </button>
              <button
                onClick={() => setActiveTab('feedback')}
                className={`px-4 py-2 rounded font-semibold text-sm transition-colors ${
                  activeTab === 'feedback'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                👨‍⚕️ Feedback
              </button>
              <button
                onClick={() => setActiveTab('differential')}
                className={`px-4 py-2 rounded font-semibold text-sm transition-colors ${
                  activeTab === 'differential'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                ⚖️ Differential
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Presentation Section */}
                  {currentExplanation.sections.presentation && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">📋 Clinical Presentation</h3>
                      <p className="text-gray-700 mb-3">{currentExplanation.sections.presentation[0] || 'Clinical context'}</p>
                      {currentExplanation.sections.presentation.length > 1 && (
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {currentExplanation.sections.presentation.slice(1).map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Differential Diagnosis Section */}
                  {currentExplanation.sections.differential && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">🔍 Differential Diagnosis</h3>
                      <div className="space-y-2">
                        {currentExplanation.sections.differential.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                            <span
                              className={`text-lg ${
                                item.probability === 'high'
                                  ? '🟢'
                                  : item.probability === 'medium'
                                  ? '🟡'
                                  : '🟠'
                              }`}
                            ></span>
                            <span className="font-semibold text-gray-900">{item.condition}</span>
                            <span className={`ml-auto text-xs px-3 py-1 rounded-full font-semibold ${
                              item.probability === 'high'
                                ? 'bg-green-100 text-green-800'
                                : item.probability === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {item.probability.toUpperCase()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Diagnosis Section */}
                  {currentExplanation.sections.diagnosis && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">✅ Diagnosis</h3>
                      <p className="text-gray-700 bg-green-50 p-4 rounded-lg border border-green-200">
                        {currentExplanation.sections.diagnosis}
                      </p>
                    </div>
                  )}

                  {/* Management Section */}
                  {currentExplanation.sections.management && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">💊 Management</h3>
                      <ol className="space-y-2 list-decimal list-inside text-gray-700">
                        {currentExplanation.sections.management.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'decision-tree' && currentExplanation.decisionTree && (
                <DecisionTreeComponent tree={currentExplanation.decisionTree} />
              )}

              {activeTab === 'feedback' && examinerFeedback && (
                <ExaminerFeedbackPanel
                  feedback={examinerFeedback}
                  examinerName="AMC Examiner"
                  questionDifficulty="medium"
                  commonMistakes={[
                    'Choosing the second most likely diagnosis',
                    'Overlooking key clinical features',
                    'Not considering timing of presentation',
                  ]}
                  nextSteps={[
                    'Review similar cases to strengthen pattern recognition',
                    'Practice time management for faster diagnosis',
                    'Study the key discriminating features in detail',
                  ]}
                />
              )}

              {activeTab === 'differential' && (
                <AlgorithmComparisonTable
                  algorithms={sampleAlgorithms}
                  title="Differential Diagnosis Comparison"
                  category="Clinical Decision Making"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!currentExplanation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-lg font-bold text-blue-900 mb-2">Load a Question</h3>
          <p className="text-blue-800">
            Enter a question ID above and click "Load Explanation" to view the complete guided explanation with all
            components.
          </p>
        </div>
      )}

      {/* Features Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 What's Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl mb-2">📋</div>
            <h4 className="font-bold text-gray-900 mb-1">Overview</h4>
            <p className="text-sm text-gray-700">Structured explanation with presentation, differential, and management</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl mb-2">🌳</div>
            <h4 className="font-bold text-gray-900 mb-1">Decision Tree</h4>
            <p className="text-sm text-gray-700">Visual clinical reasoning pathway with diagnostic branches</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl mb-2">👨‍⚕️</div>
            <h4 className="font-bold text-gray-900 mb-1">Examiner Feedback</h4>
            <p className="text-sm text-gray-700">AMC-style feedback on your answer and reasoning</p>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl mb-2">⚖️</div>
            <h4 className="font-bold text-gray-900 mb-1">Differential</h4>
            <p className="text-sm text-gray-700">Side-by-side comparison of diagnostic options</p>
          </div>
        </div>
      </div>
    </div>
  );
}