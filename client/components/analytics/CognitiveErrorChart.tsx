import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ChartDataPoint {
  name: string;
  value: number;
  percentage?: number;
}

interface CognitiveErrorChartProps {
  errors?: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
  data?: ChartDataPoint[];
  className?: string;
}

const COLORS = {
  'Knowledge Gap': '#ef4444',
  'Reasoning Error': '#f97316',
  'Data Interpretation': '#f59e0b',
  'Time Pressure': '#eab308',
};

/**
 * CognitiveErrorChart: Pie/Donut chart showing error type distribution
 * Identifies which types of errors are most common for targeted improvement
 */
export const CognitiveErrorChart: React.FC<CognitiveErrorChartProps> = ({
  errors,
  data,
  className = '',
}) => {
  // Use either errors or data prop
  const displayData = errors || data || [];

  if (!displayData || displayData.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}>
        <p className="text-gray-500 dark:text-gray-400">No error data available</p>
      </div>
    );
  }

  // Transform data if it's in the errors format
  const chartData = errors
    ? errors.map((error) => ({
        name: error.type,
        value: error.count,
        percentage: error.percentage,
      }))
    : (data as ChartDataPoint[]).map((item) => ({
        name: item.name,
        value: item.value,
        percentage: item.percentage || 0,
      }));

  // Calculate totals for the old format
  const totalErrors = errors
    ? errors.reduce((sum, e) => sum + e.count, 0)
    : (data as ChartDataPoint[]).reduce((sum, d) => sum + d.value, 0);

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Error Distribution</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total errors: {totalErrors}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name}: ${(percentage * 100).toFixed(1)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry) => (
              <Cell 
                key={`cell-${entry.name}`} 
                fill={COLORS[entry.name as keyof typeof COLORS] || '#6b7280'} 
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Error Type Details */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {chartData.map((item) => (
          <div key={item.name} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div
              className="w-3 h-3 rounded-full mb-2"
              style={{ backgroundColor: COLORS[item.name as keyof typeof COLORS] || '#6b7280' }}
            ></div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 line-clamp-2">{item.name}</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">{item.value}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {((item.percentage || 0) * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CognitiveErrorChart;
