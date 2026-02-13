'use client';

import React, { useEffect, useState } from 'react';
import RecallHeatmap from '@/components/analytics/RecallHeatmap';
import TopCoverageGauge from '@/components/analytics/TopCoverageGauge';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';

interface HotTopic {
  topic: string;
  frequency: number;
  successRate: number;
  lastSeen: string;
}

interface CoverageData {
  overallCoverage: number;
  byCategory: Record<string, { attempted: number; coverage: number }>;
  uncoveredCategories: string[];
  topCovered: Array<{ category: string; coverage: number }>;
}

/**
 * Analytics Recall Page
 * Shows topic frequency heatmap and coverage analysis
 * Route: GET /dashboard/analytics/recall
 */
export default function RecallAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hotTopics, setHotTopics] = useState<HotTopic[]>([]);
  const [coverage, setCoverage] = useState<CoverageData | null>(null);

  useEffect(() => {
    const loadRecallAnalytics = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch hot topics
        const hotTopicsData = await api.get<HotTopic[]>('/api/analytics/hot-topics', {
          params: { limit: 15, daysBack: 30 },
        });

        if (hotTopicsData && Array.isArray(hotTopicsData)) {
          setHotTopics(hotTopicsData);
        }

        // Fetch coverage data via readiness report
        const report = await api.get<any>('/api/readiness/report/me');
        if (report?.coverage) {
          setCoverage(report.coverage);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load recall analytics');
      } finally {
        setIsLoading(false);
      }
    };

    loadRecallAnalytics();
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

  const coveredCount = coverage ? Object.keys(coverage.byCategory).filter((c) => coverage.byCategory[c].coverage === 100).length : 0;
  const totalCount = coverage ? Object.keys(coverage.byCategory).length : 0;

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Recall & Coverage Analysis</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track your topic frequency and expand your knowledge breadth
        </p>
      </div>

      {/* Coverage Gauge */}
      {coverage && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <TopCoverageGauge
            coverage={coverage.overallCoverage}
            covered={coveredCount}
            total={totalCount}
          />
        </div>
      )}

      {/* Recall Heatmap */}
      {hotTopics.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <RecallHeatmap data={hotTopics} />
        </div>
      )}

      {/* Coverage Statistics */}
      {coverage && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">Overall Coverage</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {coverage.overallCoverage.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Topics with adequate attempts
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Categories</div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {totalCount}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {coveredCount} fully covered
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">Topics to Explore</div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {coverage.uncoveredCategories.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Below minimum practice threshold
            </div>
          </div>
        </div>
      )}

      {/* Top Covered Topics */}
      {coverage && coverage.topCovered.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Top Covered Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coverage.topCovered.map((topic) => (
              <div key={topic.category} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="text-sm text-green-700 dark:text-green-400 font-semibold">
                  {topic.category}
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-500 mt-1">
                  {topic.coverage}%
                </div>
                <div className="w-full bg-green-200 dark:bg-green-900/50 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-green-600 dark:bg-green-500 h-full"
                    style={{ width: `${topic.coverage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uncovered Topics */}
      {coverage && coverage.uncoveredCategories.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Areas to Explore ({coverage.uncoveredCategories.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {coverage.uncoveredCategories.map((category) => (
              <div key={category} className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <div className="text-sm text-orange-700 dark:text-orange-400 font-semibold line-clamp-2">
                  {category}
                </div>
                <button className="mt-3 px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition">
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hot Topics Insights */}
      {hotTopics.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Hot Topics Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Most Frequently Reviewed</h3>
              <div className="space-y-2">
                {hotTopics.slice(0, 5).map((topic, idx) => (
                  <div key={topic.topic} className="flex items-between justify-between p-2 bg-white dark:bg-gray-700/50 rounded">
                    <div className="flex items-center">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 mr-2">
                        {idx + 1}.
                      </span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">
                        {topic.topic}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {topic.frequency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Highest Success Rate</h3>
              <div className="space-y-2">
                {[...hotTopics]
                  .sort((a, b) => b.successRate - a.successRate)
                  .slice(0, 5)
                  .map((topic, idx) => (
                    <div key={topic.topic} className="flex items-between justify-between p-2 bg-white dark:bg-gray-700/50 rounded">
                      <div className="flex items-center">
                        <span className="font-bold text-green-600 dark:text-green-400 mr-2">
                          {idx + 1}.
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">
                          {topic.topic}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">
                        {topic.successRate.toFixed(0)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow p-6 border-l-4 border-blue-600">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Recommendations
        </h2>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          {coverage && coverage.uncoveredCategories.length > 0 && (
            <p>
              📚 <strong>Expand Coverage:</strong> You have {coverage.uncoveredCategories.length} topics below 
              the minimum practice threshold. Start with one topic from the "Areas to Explore" section.
            </p>
          )}
          {hotTopics.length > 0 && (
            <p>
              🎯 <strong>Maintain Strength:</strong> Your hot topics show good recall frequency. 
              Continue regular practice to maintain expertise.
            </p>
          )}
          <p>
            ⚡ <strong>Balanced Practice:</strong> Aim for 80%+ overall coverage to excel on the exam. 
            Mix new topics with reinforcement of strong areas.
          </p>
        </div>
      </div>
    </div>
  );
}
