'use client';

import React, { useState } from 'react';

interface TreeNode {
  label: string;
  children?: TreeNode[];
  description?: string;
  probability?: 'high' | 'medium' | 'low';
}

interface DecisionTreeComponentProps {
  tree: { root: TreeNode };
  title?: string;
  onNodeClick?: (node: TreeNode) => void;
}

/**
 * DecisionTreeComponent
 * Visualizes clinical reasoning decision tree from structured explanations
 * Shows diagnostic pathways with differential diagnosis candidates
 */
export const DecisionTreeComponent: React.FC<DecisionTreeComponentProps> = ({
  tree,
  title = 'Clinical Reasoning Pathway',
  onNodeClick,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNodeExpansion = (nodeLabel: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeLabel)) {
      newExpanded.delete(nodeLabel);
    } else {
      newExpanded.add(nodeLabel);
    }
    setExpandedNodes(newExpanded);
  };

  const getProbabilityColor = (probability?: string): string => {
    switch (probability) {
      case 'high':
        return 'bg-green-50 border-green-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'low':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getProbabilityBadge = (probability?: string): string => {
    switch (probability) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const renderNode = (node: TreeNode, depth: number = 0, parentPath: string = 'root') => {
    const nodeKey = `${parentPath}-${node.label}`;
    const isExpanded = expandedNodes.has(nodeKey);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={nodeKey} className={`ml-${depth * 4}`} style={{ marginLeft: `${depth * 2}rem` }}>
        <div
          className={`
            flex items-center gap-3 p-3 mb-2 rounded-lg border-2 cursor-pointer
            transition-all duration-200 hover:shadow-md
            ${getProbabilityColor(node.probability)}
          `}
          onClick={() => {
            if (hasChildren) toggleNodeExpansion(nodeKey);
            if (onNodeClick) onNodeClick(node);
          }}
        >
          {hasChildren && (
            <button
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-white rounded border border-gray-300 hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                toggleNodeExpansion(nodeKey);
              }}
            >
              <span className="text-sm text-gray-600">
                {isExpanded ? '−' : '+'}
              </span>
            </button>
          )}

          {!hasChildren && (
            <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-gray-300">
              •
            </div>
          )}

          <div className="flex-grow">
            <p className="font-semibold text-gray-900">{node.label}</p>
            {node.description && (
              <p className="text-sm text-gray-600 mt-1">{node.description}</p>
            )}
          </div>

          {node.probability && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getProbabilityBadge(node.probability)}`}>
              {node.probability.charAt(0).toUpperCase() + node.probability.slice(1)}
            </span>
          )}
        </div>

        {isExpanded && hasChildren && (
          <div className="mt-2">
            {node.children!.map((child, idx) =>
              renderNode(child, depth + 1, `${nodeKey}-${idx}`)
            )}
          </div>
        )}
      </div>
    );
  };

  if (!tree?.root) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 text-center">No decision tree available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">🌳</span>
        {title}
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Interactive clinical reasoning pathway. Click nodes to view details or expand for sub-pathways.
      </p>

      <div className="bg-gray-50 rounded-lg p-4">
        {renderNode(tree.root)}
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600 border-t pt-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded bg-green-100 border border-green-200"></span>
          <span>High Probability</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded bg-yellow-100 border border-yellow-200"></span>
          <span>Medium Probability</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded bg-orange-100 border border-orange-200"></span>
          <span>Low Probability</span>
        </div>
      </div>
    </div>
  );
};

export default DecisionTreeComponent;