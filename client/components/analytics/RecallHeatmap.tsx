import React from 'react';
import { Tooltip } from '@/components/ui/tooltip';

interface HeatmapData {
  topic: string;
  frequency: number;
  successRate: number;
  lastSeen: string;
}

interface RecallHeatmapProps {
  data: HeatmapData[];
  className?: string;
}

/**
 * RecallHeatmap: Grid-based heatmap showing topic frequency and success rates
 * Darker colors = higher frequency and success rate
 * Helps identify hot topics and areas of strength/weakness
 */
export const RecallHeatmap: React.FC<RecallHeatmapProps> = ({
  data,
  className = '',
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}>
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  // Normalize frequency for color intensity
  const maxFrequency = Math.max(...data.map((d) => d.frequency));
  const maxSuccessRate = Math.max(...data.map((d) => d.successRate));

  const getHeatmapColor = (frequency: number, successRate: number) => {
    const freqNorm = frequency / maxFrequency;
    const successNorm = successRate / 100;
    const intensity = (freqNorm * 0.6 + successNorm * 0.4) * 100; // Weighted average

    if (intensity >= 80) return 'bg-green-600 dark:bg-green-700';
    if (intensity >= 60) return 'bg-green-500 dark:bg-green-600';
    if (intensity >= 40) return 'bg-yellow-400 dark:bg-yellow-500';
    if (intensity >= 20) return 'bg-orange-400 dark:bg-orange-500';
    return 'bg-red-400 dark:bg-red-500';
  };

  const getTrendIcon = (lastSeen: string) => {
    const lastDate = new Date(lastSeen);
    const daysSince = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSince === 0) return '🔥'; // Hot - today
    if (daysSince <= 7) return '⬆️'; // Active
    if (daysSince <= 30) return '→'; // Stable
    return '⬇️'; // Cold
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Topic Recall Heatmap</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {data.length} topics tracked • Color intensity = frequency + success
        </p>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((item) => (
          <div
            key={item.topic}
            className={`p-4 rounded-lg text-white transition-all hover:shadow-lg cursor-pointer ${getHeatmapColor(
              item.frequency,
              item.successRate
            )}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="font-semibold text-sm line-clamp-2">{item.topic}</div>
              </div>
              <div className="text-xl ml-2">{getTrendIcon(item.lastSeen)}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="opacity-80">Frequency</div>
                <div className="text-lg font-bold">{item.frequency}</div>
              </div>
              <div>
                <div className="opacity-80">Success</div>
                <div className="text-lg font-bold">{item.successRate.toFixed(0)}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Legend</div>
        <div className="grid grid-cols-5 gap-3 text-xs">
          <div>
            <div className="w-8 h-8 bg-red-400 dark:bg-red-500 rounded mb-2"></div>
            <div>Cold (low)</div>
          </div>
          <div>
            <div className="w-8 h-8 bg-orange-400 dark:bg-orange-500 rounded mb-2"></div>
            <div>Warm</div>
          </div>
          <div>
            <div className="w-8 h-8 bg-yellow-400 dark:bg-yellow-500 rounded mb-2"></div>
            <div>Active</div>
          </div>
          <div>
            <div className="w-8 h-8 bg-green-500 dark:bg-green-600 rounded mb-2"></div>
            <div>Hot</div>
          </div>
          <div>
            <div className="w-8 h-8 bg-green-600 dark:bg-green-700 rounded mb-2"></div>
            <div>Very Hot</div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-600 dark:text-gray-400">
          <div>🔥 Reviewed today • ⬆️ Recently active • → Stable • ⬇️ Not recently reviewed</div>
        </div>
      </div>
    </div>
  );
};

export default RecallHeatmap;
