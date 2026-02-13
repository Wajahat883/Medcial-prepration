
'use client';

import { useEffect } from 'react';
import { usePhase4Store } from '@/store/phase4-store';
import BurnoutRiskIndicator from '@/components/wellness/BurnoutRiskIndicator';
import WellnessRecommendations from '@/components/wellness/WellnessRecommendations';

/**
 * Wellness Dashboard Page
 * Displays burnout detection, decline indicators, and wellness recommendations
 */
export default function WellnessPage() {
  const { wellness, loadingWellness, analyzeBurnoutRisk } = usePhase4Store();

  useEffect(() => {
    analyzeBurnoutRisk();
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Wellness & Burnout Analysis</h1>
        <p className="mt-2 text-gray-600">
          Monitor your study patterns and get personalized recovery recommendations
        </p>
      </div>

      {loadingWellness ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Analyzing your wellness data...</p>
          </div>
        </div>
      ) : wellness ? (
        <>
          {/* Burnout Risk Indicator */}
          <section className="grid grid-cols-1 gap-6">
            <BurnoutRiskIndicator
              wellness={wellness}
              onReviewRecommendations={() => {
                // Scroll to recommendations
                document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </section>

          {/* Wellness Recommendations */}
          <section id="recommendations" className="grid grid-cols-1 gap-6 pt-4">
            <h2 className="text-2xl font-bold text-gray-900">Personalized Recommendations</h2>
            <WellnessRecommendations recommendations={wellness.recommendations || []} />
          </section>

          {/* Wellness Insights Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {/* Last 7 Days Accuracy */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide">
                7-Day Trend
              </h3>
              <p className="mt-2 text-2xl font-bold text-blue-900">
                {wellness.declineIndicators?.accuracyDeclining ? '📉 Declining' : '📈 Stable'}
              </p>
              <p className="mt-1 text-xs text-blue-700">
                {wellness.declineIndicators?.accuracyDeclining
                  ? 'Your accuracy is declining. Consider taking a break.'
                  : 'Your performance is stable. Keep up the good work!'}
              </p>
            </div>

            {/* Study Load Status */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
              <h3 className="text-sm font-semibold text-purple-900 uppercase tracking-wide">
                Study Load
              </h3>
              <p className="mt-2 text-2xl font-bold text-purple-900">
                {wellness.declineIndicators?.frequencyDeclining ? '📋 Low' : '📋 Optimal'}
              </p>
              <p className="mt-1 text-xs text-purple-700">
                {wellness.declineIndicators?.frequencyDeclining
                  ? 'Consider increasing study sessions.'
                  : 'Your study frequency is ideal for retention.'}
              </p>
            </div>

            {/* Time Per Session */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
              <h3 className="text-sm font-semibold text-orange-900 uppercase tracking-wide">
                Session Duration
              </h3>
              <p className="mt-2 text-2xl font-bold text-orange-900">
                {wellness.declineIndicators?.timeDeclining ? '⏱️ Increasing' : '⏱️ Stable'}
              </p>
              <p className="mt-1 text-xs text-orange-700">
                {wellness.declineIndicators?.timeDeclining
                  ? 'Sessions taking longer. Brain may need rest.'
                  : 'Time efficiency is maintained. All good!'}
              </p>
            </div>
          </section>

          {/* Action Items */}
          <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200 mt-6">
            <h2 className="text-lg font-bold text-green-900 mb-4">💡 Wellness Tips</h2>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start">
                <span className="mr-3">✅</span>
                <span>Take 5-minute breaks every 25 minutes (Pomodoro Technique)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✅</span>
                <span>Ensure 7-9 hours of sleep each night for optimal cognitive function</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✅</span>
                <span>Exercise for 30 minutes daily to boost focus and mood</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✅</span>
                <span>Stay hydrated and maintain a balanced diet</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✅</span>
                <span>Practice mindfulness or meditation for mental clarity</span>
              </li>
            </ul>
          </section>
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No wellness data available yet. Start practicing to see insights!</p>
        </div>
      )}
    </div>
  );
}