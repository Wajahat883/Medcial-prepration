'use client';

import React, { useEffect, useState } from 'react';
import { useReadinessStore } from '@/store/readiness-store';
import ReadinessScoreMeter from '@/components/analytics/ReadinessScoreMeter';
import ReadinessBreakdown from '@/components/analytics/ReadinessBreakdown';
import ReadinessTrendGraph from '@/components/analytics/ReadinessTrendGraph';
import PerformanceTimeline from '@/components/analytics/PerformanceTimeline';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Analytics Performance Page
 * Shows comprehensive readiness analysis including score, components, trends, and recommendations
 * Route: GET /dashboard/analytics/performance
 */
export default function PerformanceAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    score,
    breakdown,
    trends,
    report,
    fetchScore,
    fetchBreakdown,
    fetchTrends,
    fetchReport,
    clearError,
  } = useReadinessStore();

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch all data in parallel
        await Promise.all([
          fetchScore('me'),
          fetchBreakdown('me'),
          fetchTrends('me'),
          fetchReport('me'),
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, [fetchScore, fetchBreakdown, fetchTrends, fetchReport]);

  if (isLoading) {
    return (
      <div className="space-y-8 p-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-64 w-full" />
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
            <button
              onClick={() => clearError()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  const components = score?.components ? [
    { name: 'Accuracy', score: score.components.accuracy, maxScore: 40, color: '#3b82f6' },
    { name: 'Stability', score: score.components.stability, maxScore: 20, color: '#8b5cf6' },
    { name: 'Coverage', score: score.components.coverage, maxScore: 20, color: '#ec4899' },
    { name: 'Time', score: score.components.time, maxScore: 10, color: '#f59e0b' },
    { name: 'Consistency', score: score.components.consistency, maxScore: 10, color: '#10b981' },
  ] : [];

  const trendData = trends && Array.isArray(trends) ? trends.map((t: any) => ({
    date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: t.score,
  })) : [];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Performance Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track your readiness score and identify areas for improvement
        </p>
      </div>

      {/* Score Meter */}
      {score && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <ReadinessScoreMeter score={score.overall} />
        </div>
      )}

      {/* Score Breakdown */}
      {components.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <ReadinessBreakdown userId="me" />
        </div>
      )}

      {/* Readiness Trends */}
      {trendData.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <ReadinessTrendGraph userId="me" />
        </div>
      )}

      {/* Recommendations */}
      {report?.recommendations && report.recommendations.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Personalized Recommendations
          </h2>
          <div className="space-y-3">
            {report.recommendations.map((rec: string, idx: number) => (
              <div key={idx} className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="mr-3 text-lg">💡</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{rec}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Stats */}
      {score?.components && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {score.components.accuracy?.toFixed(1) || 'N/A'}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Overall accuracy
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">Stability</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {score.components.stability?.toFixed(1) || 'N/A'}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Performance consistency
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">Coverage</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {score.components.coverage?.toFixed(1) || 'N/A'}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Topic coverage
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Time/Question</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {score.components.time?.toFixed(1) || 'N/A'}s
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Average response time
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">Consistency</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {score.components.consistency?.toFixed(1) || 'N/A'}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Answer consistency
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">Last Updated</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {new Date(score.lastUpdated).toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Profile updated
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
