'use client';

import React, { useEffect, useState } from 'react';
import { useAIStore } from '@/store/ai-store';
import { CognitiveErrorChart } from '@/components/analytics/CognitiveErrorChart';

/**
 * Cognitive Profile Page
 * Displays user's cognitive error patterns and clinical reasoning analysis
 * Shows error types, stretch areas, strength areas, and personalized recommendations
 */
export default function CognitiveProfilePage() {
  const {
    cognitiveProfile,
    loadingProfile,
    fetchCognitiveProfile,
  } = useAIStore();

  const [daysBack, setDaysBack] = useState(30);

  useEffect(() => {
    fetchCognitiveProfile(daysBack);
  }, [daysBack, fetchCognitiveProfile]);

  if (loadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your cognitive patterns...</p>
        </div>
      </div>
    );
  }

  if (!cognitiveProfile) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            Not enough data to generate cognitive profile. Please attempt more questions.
          </p>
        </div>
      </div>
    );
  }

  // Convert patterns to chart data format
  const chartData = cognitiveProfile.patterns.map((p) => ({
    name: p.errorType,
    value: p.frequency,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">🧠 Cognitive Profile Analysis</h1>
        <p className="text-blue-100">
          Personalized analysis of your clinical reasoning patterns and error types
        </p>
      </div>

      {/* Data Range Selector */}
      <div className="flex gap-2 items-center bg-white p-4 rounded-lg border border-gray-200">
        <label className="text-sm font-semibold text-gray-700">Analyze last:</label>
        <select
          value={daysBack}
          onChange={(e) => setDaysBack(parseInt(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={7}>7 days</option>
          <option value={14}>14 days</option>
          <option value={30}>30 days</option>
          <option value={90}>90 days</option>
        </select>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Error Pattern Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Error Type Distribution</h2>
            <CognitiveErrorChart data={chartData} />
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">📊 Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Total Errors:</span>
                <span className="font-semibold">{cognitiveProfile.patterns.reduce((sum, p) => sum + p.frequency, 0)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Error Types:</span>
                <span className="font-semibold">{cognitiveProfile.patterns.length}</span>
              </div>
              <div className="py-2">
                <span className="text-gray-600">Last Updated:</span>
                <p className="font-semibold mt-1 text-xs">
                  {new Date(cognitiveProfile.lastUpdatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Analysis Status */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <p className="text-xs text-blue-800">
              💡 <strong>Pro Tip:</strong> Focus your revision on the stretch areas identified below for maximum improvement.
            </p>
          </div>
        </div>
      </div>

      {/* Error Pattern Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🔍 Error Pattern Details</h2>
        <div className="space-y-3">
          {cognitiveProfile.patterns.map((pattern, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    pattern.impact === 'high'
                      ? 'bg-red-500'
                      : pattern.impact === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-orange-500'
                  }`}
                >
                  {pattern.frequency}
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="font-semibold text-gray-900">{pattern.errorType}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {pattern.frequency} occurrence{pattern.frequency !== 1 ? 's' : ''} • Impact:{' '}
                  <span className="font-semibold">{pattern.impact}</span>
                </p>
              </div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    pattern.impact === 'high'
                      ? 'bg-red-100 text-red-800'
                      : pattern.impact === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  {pattern.impact.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stretch Areas */}
      {cognitiveProfile.stretchAreas.length > 0 && (
        <div className="bg-red-50 rounded-lg border border-red-200 p-6">
          <h2 className="text-lg font-bold text-red-900 mb-4">📈 Stretch Areas (High Priority)</h2>
          <p className="text-sm text-red-800 mb-4">
            These are areas where you're struggling most and need focused revision:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cognitiveProfile.stretchAreas.map((area, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded border border-red-200">
                <span className="text-lg">⚠️</span>
                <span className="text-sm text-gray-900 font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strength Areas */}
      {cognitiveProfile.strengthAreas.length > 0 && (
        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <h2 className="text-lg font-bold text-green-900 mb-4">🌟 Strength Areas</h2>
          <p className="text-sm text-green-800 mb-4">
            These are your strong points - maintain and build on these:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cognitiveProfile.strengthAreas.map((area, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded border border-green-200">
                <span className="text-lg">✅</span>
                <span className="text-sm text-gray-900 font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {cognitiveProfile.recommendations.length > 0 && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">💡 Personalized Recommendations</h2>
          <ol className="space-y-3">
            {cognitiveProfile.recommendations.map((rec, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span className="text-sm text-blue-900">{rec}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200 p-6">
        <h3 className="text-lg font-bold text-indigo-900 mb-2">Next Steps</h3>
        <p className="text-sm text-indigo-800 mb-4">
          Use your personalized cognitive profile to guide your revision strategy. Focus on your stretch areas while
          maintaining your strengths.
        </p>
        <a
          href="/dashboard/ai/revision-mode"
          className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Go to Adaptive Revision Mode →
        </a>
      </div>
    </div>
  );
}