'use client';

import React, { useState } from 'react';

interface AlgorithmOption {
  name: string;
  description: string;
  probability: 'high' | 'medium' | 'low';
  keyFeatures: string[];
  requiredTests?: string[];
  management?: string;
  advantages?: string[];
  disadvantages?: string[];
}

interface AlgorithmComparisonTableProps {
  algorithms: AlgorithmOption[];
  selectedAlgorithm?: string;
  onSelect?: (algorithmName: string) => void;
  title?: string;
  category?: string;
}

/**
 * AlgorithmComparisonTable
 * Side-by-side comparison of differential diagnoses or clinical algorithms
 * Shows key features, tests, and management for each option
 */
export const AlgorithmComparisonTable: React.FC<AlgorithmComparisonTableProps> = ({
  algorithms,
  selectedAlgorithm,
  onSelect,
  title = 'Differential Diagnosis Comparison',
  category = 'Clinical Algorithm',
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpansion = (algorithmName: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(algorithmName)) {
      newExpanded.delete(algorithmName);
    } else {
      newExpanded.add(algorithmName);
    }
    setExpandedRows(newExpanded);
  };

  const getProbabilityColor = (probability: string): string => {
    switch (probability) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getProbabilityIcon = (probability: string): string => {
    switch (probability) {
      case 'high':
        return '🟢';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟠';
      default:
        return '⚪';
    }
  };

  if (algorithms.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 text-center">No algorithms available for comparison</p>
      </div>
    );
  }

  const isExpanded = (name: string) => expandedRows.has(name);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4 text-white">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          {title}
        </h3>
        <p className="text-sm text-blue-100 mt-1">{category}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Diagnosis</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Probability</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Key Features</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {algorithms.map((algo, idx) => (
              <React.Fragment key={idx}>
                {/* Main Row */}
                <tr
                  className={`border-b border-gray-200 cursor-pointer transition-colors ${
                    selectedAlgorithm === algo.name
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => onSelect?.(algo.name)}
                >
                  <td className="px-4 py-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{algo.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{algo.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getProbabilityColor(algo.probability)}`}>
                      {getProbabilityIcon(algo.probability)} {algo.probability.charAt(0).toUpperCase() + algo.probability.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {algo.keyFeatures.slice(0, 2).map((feature, fidx) => (
                        <span
                          key={fidx}
                          className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-200"
                        >
                          {feature}
                        </span>
                      ))}
                      {algo.keyFeatures.length > 2 && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{algo.keyFeatures.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRowExpansion(algo.name);
                      }}
                    >
                      {isExpanded(algo.name) ? '−' : '+'}
                    </button>
                  </td>
                </tr>

                {/* Expanded Details Row */}
                {isExpanded(algo.name) && (
                  <tr className="bg-blue-50 border-b border-gray-200">
                    <td colSpan={4} className="px-4 py-4">
                      <div className="space-y-4">
                        {/* Key Features */}
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">🔍 Key Features</h5>
                          <div className="flex flex-wrap gap-2">
                            {algo.keyFeatures.map((feature, fidx) => (
                              <span
                                key={fidx}
                                className="inline-block px-3 py-1 bg-white text-blue-700 text-sm rounded-full border border-blue-300"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Required Tests */}
                        {algo.requiredTests && algo.requiredTests.length > 0 && (
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">🧪 Required Tests</h5>
                            <ul className="grid grid-cols-2 gap-2">
                              {algo.requiredTests.map((test, tidx) => (
                                <li key={tidx} className="flex items-start gap-2">
                                  <span className="text-blue-600 mt-0.5">✓</span>
                                  <span className="text-sm text-gray-800">{test}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Management */}
                        {algo.management && (
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">💊 Management</h5>
                            <p className="text-sm text-gray-800">{algo.management}</p>
                          </div>
                        )}

                        {/* Advantages & Disadvantages */}
                        <div className="grid grid-cols-2 gap-4">
                          {algo.advantages && algo.advantages.length > 0 && (
                            <div>
                              <h5 className="font-semibold text-green-900 mb-2">✅ Advantages</h5>
                              <ul className="space-y-1">
                                {algo.advantages.map((adv, aidx) => (
                                  <li key={aidx} className="text-sm text-gray-800 flex gap-2">
                                    <span className="text-green-600">•</span>
                                    {adv}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {algo.disadvantages && algo.disadvantages.length > 0 && (
                            <div>
                              <h5 className="font-semibold text-red-900 mb-2">❌ Disadvantages</h5>
                              <ul className="space-y-1">
                                {algo.disadvantages.map((dis, didx) => (
                                  <li key={didx} className="text-sm text-gray-800 flex gap-2">
                                    <span className="text-red-600">•</span>
                                    {dis}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Legend */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-600 font-semibold mb-2">Probability Legend:</p>
        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
            <span>High probability (most likely diagnosis)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span>Medium probability (consider in differential)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-400"></span>
            <span>Low probability (less likely but important)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmComparisonTable;