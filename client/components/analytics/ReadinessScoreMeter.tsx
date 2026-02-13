import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ReadinessScoreMeterProps {
  score: number; // 0-100
  interpretation?: string;
  className?: string;
}

/**
 * ReadinessScoreMeter: Circular progress indicator showing overall readiness score
 * Displays coloring based on score ranges:
 * - Red: 0-30 (Not Ready)
 * - Orange: 31-60 (Partially Ready)
 * - Yellow: 61-80 (Ready)
 * - Green: 81-100 (Exam Ready)
 */
export const ReadinessScoreMeter: React.FC<ReadinessScoreMeterProps> = ({
  score,
  interpretation,
  className = '',
}) => {
  const data = [
    { name: 'score', value: score },
    { name: 'remaining', value: 100 - score },
  ];

  const getColor = (value: number) => {
    if (value >= 81) return '#10b981'; // Green
    if (value >= 61) return '#f59e0b'; // Yellow
    if (value >= 31) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  const getInterpretation = (value: number) => {
    if (value >= 81) return 'Exam Ready';
    if (value >= 61) return 'Ready';
    if (value >= 31) return 'Partially Ready';
    return 'Not Ready';
  };

  const color = getColor(score);
  const defaultInterpretation = getInterpretation(score);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            startAngle={180}
            endAngle={0}
            dataKey="value"
          >
            <Cell fill={color} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Score Display */}
      <div className="text-center -mt-20">
        <div className="text-5xl font-bold" style={{ color }}>
          {score.toFixed(1)}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">out of 100</div>
      </div>

      {/* Interpretation */}
      <div className="mt-6 text-center">
        <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {interpretation || defaultInterpretation}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-4 gap-2 text-xs">
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-1"></div>
          <div>0-30</div>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-orange-500 mx-auto mb-1"></div>
          <div>31-60</div>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mx-auto mb-1"></div>
          <div>61-80</div>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1"></div>
          <div>81-100</div>
        </div>
      </div>
    </div>
  );
};

export default ReadinessScoreMeter;
