'use client';

import { useEffect, useState } from 'react';
import { usePhase4Store } from '@/store/phase4-store';
import PredictiveImpactVisualization from '@/components/monetization/PredictiveImpactVisualization';
import ConversionMetricsDashboard from '@/components/monetization/ConversionMetricsDashboard';
import ExamReadinessUpsell from '@/components/monetization/ExamReadinessUpsell';

/**
 * Monetization & Premium Features Dashboard
 * Displays predictive impact, conversion metrics, and premium upsell
 */
export default function MonetizationPage() {
  const {
    predictiveImpact,
    conversionMetrics,
    loadingExternal,
    calculateImpact,
    fetchConversionMetrics,
  } = usePhase4Store();

  const [currentAccuracy, setCurrentAccuracy] = useState(65);
  const [targetAccuracy, setTargetAccuracy] = useState(75);
  const [daysUntilExam, setDaysUntilExam] = useState(45);

  useEffect(() => {
    fetchConversionMetrics();
    calculateImpact(currentAccuracy, targetAccuracy, 'general', daysUntilExam);
  }, []);

  const handleCalculateImpact = () => {
    calculateImpact(currentAccuracy, targetAccuracy, 'general', daysUntilExam);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Premium Features & Analytics</h1>
        <p className="mt-2 text-gray-600">
          Unlock advanced features to accelerate your exam preparation
        </p>
      </div>

      {/* Predictive Impact Calculator */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pass Probability Calculator</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Current Accuracy Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Accuracy: {currentAccuracy}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={currentAccuracy}
              onChange={(e) => setCurrentAccuracy(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Target Accuracy Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Accuracy: {targetAccuracy}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={targetAccuracy}
              onChange={(e) => setTargetAccuracy(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Days Until Exam Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Days Until Exam: {daysUntilExam}
            </label>
            <input
              type="range"
              min="1"
              max="180"
              value={daysUntilExam}
              onChange={(e) => setDaysUntilExam(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={handleCalculateImpact}
          disabled={loadingExternal}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {loadingExternal ? 'Calculating...' : 'Calculate Impact'}
        </button>

        {loadingExternal && (
          <div className="mt-4 text-center text-gray-500">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {predictiveImpact && !loadingExternal && (
          <div className="mt-8">
            <PredictiveImpactVisualization impact={predictiveImpact} />
          </div>
        )}
      </section>

      {/* Exam Readiness Upsell */}
      <section>
        <ExamReadinessUpsell
          passProbability={Math.round(currentAccuracy)}
          estimatedHours={Math.max(0, daysUntilExam * 2)}
          onUpgrade={() => console.log('Upgrade clicked')}
        />
      </section>

      {/* Conversion Metrics Dashboard */}
      {conversionMetrics && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Metrics</h2>
          <ConversionMetricsDashboard metrics={conversionMetrics} />
        </section>
      )}

      {/* Premium Benefits Breakdown */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Premium Benefits</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: '🧠',
              title: 'Cognitive Analysis',
              description: 'AI-powered analysis of your learning patterns and weak areas',
            },
            {
              icon: '📊',
              title: 'Readiness Scoring',
              description: 'Real-time readiness score with personalized study recommendations',
            },
            {
              icon: '📖',
              title: 'Revision Mode',
              description: 'Optimized revision sessions focused on your weak topics',
            },
            {
              icon: '👨‍⚕️',
              title: 'Expert Feedback',
              description: 'Get detailed feedback on your answers from medical experts',
            },
            {
              icon: '⚡',
              title: 'Speed Optimization',
              description: 'Time management techniques to improve your test taking speed',
            },
            {
              icon: '📈',
              title: 'Performance Tracking',
              description: 'Detailed analytics and progress tracking across all subjects',
            },
          ].map((benefit, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
            >
              <p className="text-3xl mb-2">{benefit.icon}</p>
              <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trial and Pricing Info */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
        <h3 className="text-lg font-bold text-purple-900 mb-3">✨ Premium Subscription</h3>
        <p className="text-sm text-purple-800 mb-4">
          Upgrade to Premium for just <strong>$29/month</strong> and get all advanced features.
        </p>
        <div className="flex gap-3">
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors">
            Start 7-Day Free Trial
          </button>
          <button className="flex-1 bg-white hover:bg-gray-50 text-purple-600 font-semibold py-2 rounded-lg border border-purple-300 transition-colors">
            View Plans
          </button>
        </div>
      </section>
    </div>
  );
}