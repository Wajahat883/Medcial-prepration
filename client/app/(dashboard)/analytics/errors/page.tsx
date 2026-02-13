'use client';

import React, { useEffect, useState } from 'react';
import CognitiveErrorChart from '@/components/analytics/CognitiveErrorChart';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';

interface CognitiveErrorsData {
  totalErrors: number;
  byType: Record<string, number>;
  byTypePercentage: Record<string, number>;
  byCategory: Record<string, { count: number; types: Record<string, number> }>;
  recommendations: string[];
}

interface ErrorType {
  type: string;
  count: number;
  percentage: number;
}

/**
 * Analytics Errors Page
 * Shows cognitive error analysis including error types, categories, and recommendations
 * Route: GET /dashboard/analytics/errors
 */
export default function ErrorsAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorData, setErrorData] = useState<CognitiveErrorsData | null>(null);

  useEffect(() => {
    const loadErrorAnalytics = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const errorData = await api.get<CognitiveErrorsData>('/api/analytics/cognitive-errors', {
          params: { daysBack: 30 },
        });

        setErrorData(errorData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load error analytics');
      } finally {
        setIsLoading(false);
      }
    };

    loadErrorAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8 p-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="text-red-800 dark:text-red-200">
            <h3 className="font-semibold mb-2">Error Loading Analytics</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!errorData) {
    return (
      <div className="p-6 text-center text-gray-500">
        No error data available. Complete more practice questions to see error analysis.
      </div>
    );
  }

  // Transform data for chart
  const errorTypes: ErrorType[] = Object.entries(errorData.byType).map(([type, count]) => ({
    type,
    count,
    percentage: errorData.byTypePercentage[type] || 0,
  }));

  // Category-specific analysis
  const categoryErrors = Object.entries(errorData.byCategory)
    .map(([category, data]) => ({
      category,
      ...data,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const getMostCommonError = (types: Record<string, number>) => {
    return Object.entries(types).sort(([, a], [, b]) => b - a)[0]?.[0] || 'Unknown';
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Error Analysis</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Understand your error patterns and target improvement areas
        </p>
      </div>

      {/* Error Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Errors (30 days)</div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">
            {errorData.totalErrors}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">Most Common Error</div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {getMostCommonError(errorData.byType)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            {errorData.byType[getMostCommonError(errorData.byType)]} occurrences
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">Categories Affected</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {Object.keys(errorData.byCategory).length}
          </div>
        </div>
      </div>

      {/* Error Distribution Chart */}
      {errorTypes.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <CognitiveErrorChart errors={errorTypes} />
        </div>
      )}

      {/* Error Details by Category */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Errors by Category
        </h2>
        <div className="space-y-3">
          {categoryErrors.map((cat) => (
            <div
              key={cat.category}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-gray-900 dark:text-white">{cat.category}</div>
                <div className="text-lg font-bold text-red-600 dark:text-red-400">{cat.count}</div>
              </div>

              {/* Error type breakdown for this category */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(cat.types).map(([type, count]) => (
                  <div key={type} className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded text-xs">
                    <div className="font-semibold text-gray-700 dark:text-gray-300">{type}</div>
                    <div className="text-gray-600 dark:text-gray-400">{count}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {errorData.recommendations && errorData.recommendations.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recommendations
          </h2>
          <div className="space-y-3">
            {errorData.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="mr-3 text-lg">💡</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{rec}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Pattern Analysis */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Error Pattern Analysis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Error Types Explained</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-semibold text-red-600 dark:text-red-400">Knowledge Gap</div>
                <div className="text-gray-700 dark:text-gray-300">
                  Lacking fundamental knowledge or definitions needed to answer the question
                </div>
              </div>
              <div>
                <div className="font-semibold text-orange-600 dark:text-orange-400">Reasoning Error</div>
                <div className="text-gray-700 dark:text-gray-300">
                  Unable to apply logic or reasoning steps correctly
                </div>
              </div>
              <div>
                <div className="font-semibold text-yellow-600 dark:text-yellow-400">Data Interpretation</div>
                <div className="text-gray-700 dark:text-gray-300">
                  Difficulty reading charts, graphs, or interpreting statistical data
                </div>
              </div>
              <div>
                <div className="font-semibold text-orange-600 dark:text-orange-400">Time Pressure</div>
                <div className="text-gray-700 dark:text-gray-300">
                  Running out of time and making careless mistakes
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Next Steps</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <span className="mr-2">1.</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Review questions from high-error categories
                </span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">2.</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Focus on the most common error type first
                </span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">3.</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Use targeted study resources for knowledge gaps
                </span>
              </div>
              <div className="flex items-start">
                <span className="mr-2">4.</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Practice time management for speed improvement
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
