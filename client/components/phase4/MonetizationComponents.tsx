'use client';

import React, { useState } from 'react';

interface PredictiveImpactData {
  currentPassProbability: number;
  projectedPassProbability: number;
  timesSaved: number;
  message: string;
}

/**
 * Predictive Impact Visualization Component
 * Shows impact of improvement: "If you improve to 70%: Pass Probability: 73% (+15 weeks saved)"
 */
export const PredictiveImpactVisualization: React.FC<{ impact: PredictiveImpactData }> = ({ impact }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-300 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span>📈</span> Your Potential Impact
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Current State */}
        <div className="bg-white rounded-lg p-4 border-2 border-orange-300">
          <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Current</p>
          <p className="text-2xl font-bold text-orange-600">
            {impact.currentPassProbability.toFixed(0)}%
          </p>
          <p className="text-xs text-gray-600 mt-1">Pass Probability</p>
        </div>

        {/* Projected State */}
        <div className="bg-white rounded-lg p-4 border-2 border-green-300">
          <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Projected</p>
          <p className="text-2xl font-bold text-green-600">
            {impact.projectedPassProbability.toFixed(0)}%
          </p>
          <p className="text-xs text-gray-600 mt-1">
            +{(impact.projectedPassProbability - impact.currentPassProbability).toFixed(0)}%{' '}
            improvement
          </p>
        </div>
      </div>

      {/* Time Savings */}
      <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600 mb-4">
        <p className="text-sm text-gray-600 mb-1">
          <strong>⏰ Time Saved:</strong> {impact.timesSaved} weeks
        </p>
        <p className="text-xs text-gray-500">
          Focused study on weak areas can significantly accelerate your readiness
        </p>
      </div>

      {/* Message */}
      <p className="text-sm text-gray-800 bg-white p-3 rounded border border-gray-200 whitespace-pre-line">
        {impact.message}
      </p>

      {/* Call to Action */}
      <button className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
        🔓 Unlock Cognitive Analysis to accelerate improvement
      </button>
    </div>
  );
};

/**
 * Feature Teaser Component
 * Shows locked premium features with preview and upgrade prompt
 */
export const FeatureTeaserCard: React.FC<{
  featureName: string;
  preview: string;
  upgradePrompt: string;
}> = ({ featureName, preview, upgradePrompt }) => {
  const featureIcons: Record<string, string> = {
    readiness_score: '📊',
    cognitive_analysis: '🧠',
    revision_mode: '🎯',
    exam_readiness: '✅',
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-300 p-4 relative overflow-hidden">
      {/* Locked overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            <span className="text-xl">{featureIcons[featureName] || '🔒'}</span>
            {featureName.replace(/_/g, ' ').toUpperCase()}
          </h4>
          <span className="px-2 py-1 bg-gray-900 text-white text-xs rounded font-semibold">🔒 LOCKED</span>
        </div>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{preview}</p>

        <button className="w-full px-3 py-2 bg-indigo-600 text-white text-xs font-semibold rounded hover:bg-indigo-700 transition-colors">
          {upgradePrompt}
        </button>
      </div>
    </div>
  );
};

/**
 * Exam Readiness Upsell Component
 * Shows upgrade value for exam readiness features
 */
export const ExamReadinessUpsell: React.FC<{
  currentAccuracy: number;
  daysUntilExam: number;
  subject: string;
}> = ({ currentAccuracy, daysUntilExam, subject }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-6">
      <h3 className="text-xl font-bold mb-2">🚀 Get Exam Ready Faster</h3>
      <p className="text-sm text-purple-100 mb-4">
        Premium users improve {23}% faster with personalized cognitive analysis and adaptive revision
      </p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 bg-black/20 p-3 rounded">
          <span className="text-lg">📊</span>
          <span className="text-sm">Readiness Score with IRT-weighted accuracy</span>
        </div>
        <div className="flex items-center gap-3 bg-black/20 p-3 rounded">
          <span className="text-lg">🧠</span>
          <span className="text-sm">Cognitive error pattern analysis</span>
        </div>
        <div className="flex items-center gap-3 bg-black/20 p-3 rounded">
          <span className="text-lg">🎯</span>
          <span className="text-sm">Adaptive revision mode with spaced repetition</span>
        </div>
        <div className="flex items-center gap-3 bg-black/20 p-3 rounded">
          <span className="text-lg">👨‍⚕️</span>
          <span className="text-sm">AMC-style examiner feedback</span>
        </div>
      </div>

      <div className="bg-black/30 p-3 rounded-lg mb-4">
        <p className="text-xs text-purple-100 mb-2">
          Based on your ${subject} performance, premium could save you:
        </p>
        <p className="text-2xl font-bold">
          {Math.ceil((daysUntilExam / 100) * (100 - currentAccuracy) * 0.23)} Days
        </p>
        <p className="text-xs text-purple-100 mt-1">Estimated time savings with focused premium revision</p>
      </div>

      <button className="w-full px-4 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
        Upgrade to Premium • Only $29/month
      </button>

      <p className="text-xs text-purple-200 text-center mt-3">7-day free trial • Cancel anytime</p>
    </div>
  );
};

/**
 * Conversion Metrics Dashboard Component
 */
export const ConversionMetricsDashboard: React.FC<{
  metrics: {
    totalTeasersShown: number;
    totalUpsellClicks: number;
    totalConversions: number;
    ctcRate: string | number;
    conversionRate: string | number;
  };
}> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span>📊</span> Conversion Metrics (Last 30 Days)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-600 font-semibold uppercase mb-1">Teasers Shown</p>
          <p className="text-3xl font-bold text-blue-600">{metrics.totalTeasersShown}</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-xs text-purple-600 font-semibold uppercase mb-1">Upsell Clicks</p>
          <p className="text-3xl font-bold text-purple-600">{metrics.totalUpsellClicks}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-xs text-green-600 font-semibold uppercase mb-1">Conversions</p>
          <p className="text-3xl font-bold text-green-600">{metrics.totalConversions}</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <p className="text-xs text-orange-600 font-semibold uppercase mb-1">CTR</p>
          <p className="text-3xl font-bold text-orange-600">{metrics.ctcRate}%</p>
          <p className="text-xs text-orange-600 mt-1">Click-through rate</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-xs text-red-600 font-semibold uppercase mb-1">Conv. Rate</p>
          <p className="text-3xl font-bold text-red-600">{metrics.conversionRate}%</p>
          <p className="text-xs text-red-600 mt-1">Conversion rate</p>
        </div>
      </div>
    </div>
  );
};

export default {
  PredictiveImpactVisualization,
  FeatureTeaserCard,
  ExamReadinessUpsell,
  ConversionMetricsDashboard,
};