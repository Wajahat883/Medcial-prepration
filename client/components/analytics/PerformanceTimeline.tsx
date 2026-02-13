import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface TestData {
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  duration: number;
}

interface PerformanceTimelineProps {
  data: TestData[];
  className?: string;
}

/**
 * PerformanceTimeline: Line chart showing test scores over time with annotations
 * Helps visualize improvement trajectory and identify performance patterns
 */
export const PerformanceTimeline: React.FC<PerformanceTimelineProps> = ({
  data,
  className = '',
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}>
        <p className="text-gray-500 dark:text-gray-400">No test data available</p>
      </div>
    );
  }

  // Calculate average score for reference line
  const avgScore = data.reduce((sum, d) => sum + d.score, 0) / data.length;
  const maxScore = Math.max(...data.map((d) => d.score));
  const minScore = Math.min(...data.map((d) => d.score));

  // Format data for chart
  const chartData = data.map((test) => ({
    ...test,
    accuracy: ((test.correctAnswers / test.totalQuestions) * 100).toFixed(1),
    dateShort: new Date(test.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  // Determine trend
  const firstHalf = chartData.slice(0, Math.floor(chartData.length / 2));
  const secondHalf = chartData.slice(Math.floor(chartData.length / 2));
  const firstAvg = firstHalf.reduce((sum, d) => sum + d.score, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((sum, d) => sum + d.score, 0) / secondHalf.length;
  const trend = secondAvg > firstAvg ? '📈 Improving' : secondAvg < firstAvg ? '📉 Declining' : '→ Stable';

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Performance Timeline</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.length} tests • Span: {data.length > 1 ? Math.floor((new Date(data[data.length - 1].date).getTime() - new Date(data[0].date).getTime()) / (1000 * 60 * 60 * 24)) : 0} days
          </p>
        </div>
        <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">{trend}</div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="dateShort"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            domain={[0, 100]}
            label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value, name) => {
              if (name === 'score') {
                const numValue = typeof value === 'number' ? value : parseFloat(value as string);
                return [`${numValue.toFixed(1)}%`, 'Score'];
              }
              return [value, name];
            }}
          />
          <Legend />

          {/* Average line */}
          <ReferenceLine
            y={avgScore}
            stroke="#6b7280"
            strokeDasharray="5 5"
            label={{ value: `Average: ${avgScore.toFixed(1)}%`, position: 'right', fill: '#6b7280' }}
          />

          {/* Exam Ready threshold */}
          <ReferenceLine
            y={80}
            stroke="#10b981"
            strokeDasharray="3 3"
            label={{ value: 'Exam Ready (80%)', position: 'right', fill: '#10b981' }}
          />

          {/* Score line */}
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 5 }}
            activeDot={{ r: 7 }}
            name="Score"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">Current Score</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {chartData[chartData.length - 1].score.toFixed(1)}%
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">Average Score</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {avgScore.toFixed(1)}%
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">Highest Score</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {maxScore.toFixed(1)}%
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">Lowest Score</div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {minScore.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Analysis */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Performance Analysis</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {secondAvg > firstAvg ? (
            <>
              Your performance is <span className="font-semibold text-green-600 dark:text-green-400">improving</span>. 
              Keep up the current study strategy.
            </>
          ) : secondAvg < firstAvg ? (
            <>
              Your performance is <span className="font-semibold text-red-600 dark:text-red-400">declining</span>. 
              Review recent mistakes and adjust your approach.
            </>
          ) : (
            <>
              Your performance is <span className="font-semibold text-yellow-600 dark:text-yellow-400">stable</span>. 
              Consider intensifying your practice.
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceTimeline;
