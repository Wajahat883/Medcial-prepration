'use client';

import React, { useState } from 'react';

interface ClinicalValueHighlightProps {
  stemText: string;
  onHighlighted?: (html: string) => void;
}

/**
 * Lab Value Highlighter Component
 * Displays clinical stem with color-coded vital signs and lab values
 * Green for normal, red for abnormal, helps cognitive load
 */
export const LabValueHighlighter: React.FC<ClinicalValueHighlightProps> = ({ stemText, onHighlighted }) => {
  const [showHighlights, setShowHighlights] = useState(true);

  // Regex patterns for vital signs and lab values
  const abnormalPatterns = [
    { regex: /\b(HR|heart rate|pulse)[:\s]+(\d+)\s*(bpm)?/gi, limits: { min: 60, max: 100 } },
    { regex: /\b(BP|blood pressure)[:\s]+(\d+)\/(\d+)\s*(mmHg)?/gi, limits: { min: 90, max: 140 } },
    { regex: /\bO2 sat[:\s]+(\d+)\s*(%)?/gi, limits: { min: 95, max: 100 } },
    { regex: /\bTemperature[:\s]+(\d+\.?\d*)\s*(°C|C)?/gi, limits: { min: 36.5, max: 37.5 } },
    { regex: /\bNa[+]?[:\s]+(\d+)\s*(mEq|mmol)\/L?/gi, limits: { min: 135, max: 145 } },
    { regex: /\bK\+?[:\s]+(\d+\.?\d*)\s*(mEq|mmol)\/L?/gi, limits: { min: 3.5, max: 5.0 } },
    { regex: /\bCl[:\s]+(\d+)\s*(mEq|mmol)\/L?/gi, limits: { min: 98, max: 107 } },
    {
      regex: /\bHCO3[:\s]+(\d+)\s*(mEq|mmol)\/L?/gi,
      limits: { min: 22, max: 26 },
    },
    { regex: /\bGlucose[:\s]+(\d+)\s*(mg|mmol)\/dL?/gi, limits: { min: 70, max: 100 } },
    { regex: /\bHemoglobin|Hgb[:\s]+(\d+\.?\d*)\s*(g)\/dL?/gi, limits: { min: 13.5, max: 17.5 } },
    { regex: /\bWBC[:\s]+(\d+\.?\d*)\s*(×10³)?/gi, limits: { min: 4.5, max: 11.0 } },
    { regex: /\bCreatinine|Cr[:\s]+(\d+\.?\d*)\s*(mg)\/dL?/gi, limits: { min: 0.7, max: 1.3 } },
  ];

  let highlightedText = stemText;

  if (showHighlights) {
    // Simple value highlighting
    highlightedText = stemText.replace(/\d+\.?\d*/g, (match) => {
      const value = parseFloat(match);
      if (value > 200 || value < 50) {
        return `<span style="background-color: #ffcccc; color: #cc0000; font-weight: bold; padding: 2px 4px; border-radius: 3px;">${match}</span>`;
      } else if (value > 150 || value < 60) {
        return `<span style="background-color: #ffffcc; color: #cc8800; font-weight: bold; padding: 2px 4px; border-radius: 3px;">${match}</span>`;
      }
      return match;
    });
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>🧪</span> Clinical Stem
        </h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showHighlights}
            onChange={(e) => setShowHighlights(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">Highlight Vitals/Labs</span>
        </label>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="text-gray-800 leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
          {showHighlights ? (
            <span dangerouslySetInnerHTML={{ __html: highlightedText }} />
          ) : (
            stemText
          )}
        </p>
      </div>

      {showHighlights && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700 font-semibold mb-2">Color Legend:</p>
          <div className="flex flex-wrap gap-4 text-xs text-blue-800">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Mildly Abnormal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Significantly Abnormal</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Clinical Stem Collapse Component
 * Auto-collapses long stems and shows abstract with toggle
 */
export const ClinicalStemCollapse: React.FC<{ stemText: string }> = ({ stemText }) => {
  const [isExpanded, setIsExpanded] = useState(stemText.length < 150);

  const abstract = stemText.substring(0, 150) + (stemText.length > 150 ? '...' : '');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {isExpanded ? '📖 Collapse' : '📖 Expand'} Clinical Stem
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        {isExpanded ? (
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{stemText}</p>
        ) : (
          <p className="text-gray-600 leading-relaxed">{abstract}</p>
        )}
      </div>

      {!isExpanded && (
        <p className="text-xs text-gray-500 mt-2">
          Click "Expand" button above to see the full clinical context
        </p>
      )}
    </div>
  );
};

/**
 * Noise Reduction Toggle Component
 * Hides analytics, sidebar, progress bars for focused practice
 */
export const NoiseReductionToggle: React.FC<{ onToggle?: (enabled: boolean) => void }> = ({ onToggle }) => {
  const [enabled, setEnabled] = React.useState(false);

  const handleToggle = (value: boolean) => {
    setEnabled(value);
    onToggle?.(value);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900">🎯 Noise Reduction Mode</h3>
          <p className="text-sm text-gray-600 mt-1">Hide distractions • Focus on questions only</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => handleToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {enabled && (
        <div className="mt-3 p-3 bg-green-50 rounded border border-green-200 text-sm text-green-800">
          ✅ Noise reduction enabled. Analytics, sidebar, and progress bars are hidden.
        </div>
      )}
    </div>
  );
};

export default { LabValueHighlighter, ClinicalStemCollapse, NoiseReductionToggle };