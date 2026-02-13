import React from 'react';

interface TopCoverageGaugeProps {
  coverage: number; // 0-100
  covered: number; // number of categories completed
  total: number; // total categories
  className?: string;
}

/**
 * TopCoverageGauge: Gauge chart showing topic coverage percentage
 * Visual representation of how many topics have been adequately covered
 */
const TopCoverageGauge: React.FC<TopCoverageGaugeProps> = ({
  coverage,
  covered,
  total,
  className = '',
}) => {
  const getGaugeColor = (value: number) => {
    if (value >= 80) return 'from-green-400 to-green-600';
    if (value >= 60) return 'from-yellow-400 to-yellow-600';
    if (value >= 40) return 'from-orange-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  const getStatus = (value: number) => {
    if (value >= 80) return 'Excellent Coverage';
    if (value >= 60) return 'Good Coverage';
    if (value >= 40) return 'Moderate Coverage';
    return 'Limited Coverage';
  };

  const gaugeColor = getGaugeColor(coverage);
  const status = getStatus(coverage);

  // Calculate rotation for needle
  const rotation = (coverage / 100) * 180 - 90;

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="mb-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Topic Coverage</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {covered} of {total} categories
        </p>
      </div>

      {/* SVG Gauge */}
      <svg viewBox="0 0 200 120" className="w-full h-auto">
        {/* Gauge background */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="33%" stopColor="#f97316" />
            <stop offset="66%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Gauge arc */}
        <path
          d="M 30 100 A 70 70 0 0 1 170 100"
          stroke="url(#gaugeGradient)"
          strokeWidth={20}
          fill="none"
          strokeLinecap="round"
        />

        {/* Gauge background arc */}
        <path
          d="M 30 100 A 70 70 0 0 1 170 100"
          stroke="#e5e7eb"
          strokeWidth={20}
          fill="none"
          opacity={0.2}
          strokeLinecap="round"
        />

        {/* Needle */}
        <g transform={`translate(100, 100) rotate(${rotation})`}>
          <circle cx="0" cy="0" r="6" fill="#1f2937" />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-60"
            stroke="#1f2937"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* Center circle */}
        <circle cx="100" cy="100" r="8" fill="#1f2937" />

        {/* Labels */}
        <text x="35" y="115" fontSize="12" fill="#6b7280" fontWeight="bold">
          0%
        </text>
        <text x="100" y="115" fontSize="12" fill="#6b7280" fontWeight="bold" textAnchor="middle">
          50%
        </text>
        <text x="160" y="115" fontSize="12" fill="#6b7280" fontWeight="bold" textAnchor="end">
          100%
        </text>
      </svg>

      {/* Coverage Display */}
      <div className="mt-6 text-center">
        <div className="text-5xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
          {coverage.toFixed(1)}%
        </div>
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-2">{status}</div>
      </div>

      {/* Achievement Milestones */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold text-sm">
            0%
          </div>
          <div className="ml-4 flex-1">
            <div className="font-semibold text-gray-700 dark:text-gray-300">Limited</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Less than 40% topics covered</div>
          </div>
          {coverage < 40 && <div className="text-2xl">✓</div>}
        </div>

        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-sm">
            40%
          </div>
          <div className="ml-4 flex-1">
            <div className="font-semibold text-gray-700 dark:text-gray-300">Moderate</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">40-60% topics covered</div>
          </div>
          {coverage >= 40 && coverage < 60 && <div className="text-2xl">✓</div>}
        </div>

        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 font-bold text-sm">
            60%
          </div>
          <div className="ml-4 flex-1">
            <div className="font-semibold text-gray-700 dark:text-gray-300">Good</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">60-80% topics covered</div>
          </div>
          {coverage >= 60 && coverage < 80 && <div className="text-2xl">✓</div>}
        </div>

        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold text-sm">
            80%
          </div>
          <div className="ml-4 flex-1">
            <div className="font-semibold text-gray-700 dark:text-gray-300">Excellent</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">80-100% topics covered</div>
          </div>
          {coverage >= 80 && <div className="text-2xl">✓</div>}
        </div>
      </div>

      {/* Recommendation */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">Recommendation</div>
        <div className="text-sm text-blue-600 dark:text-blue-400">
          {coverage < 40
            ? 'Start by exploring more topics to build a broader foundation.'
            : coverage < 60
            ? 'Good progress! Expand coverage to remaining topics.'
            : coverage < 80
            ? 'Very good! A few topics remain. Try to reach 80% coverage.'
            : 'Excellent! You have strong coverage. Focus on mastering weaker areas.'}
        </div>
      </div>
    </div>
  );
};

export default TopCoverageGauge;
