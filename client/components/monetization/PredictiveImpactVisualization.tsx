'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ImpactData {
  currentPassProbability: number;
  projectedPassProbability: number;
  improvementPercentage: number;
  estimatedStudyHours: number;
}

interface PredictiveImpactVisualizationProps {
  impact?: ImpactData;
}

const PredictiveImpactVisualization: React.FC<PredictiveImpactVisualizationProps> = ({ impact }) => {
  if (!impact) {
    return <div>Loading impact analysis...</div>;
  }

  const improvement = impact.projectedPassProbability - impact.currentPassProbability;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pass Probability Impact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Current Pass Probability</p>
            <p className="text-3xl font-bold text-blue-600">{impact.currentPassProbability}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Projected Pass Probability</p>
            <p className="text-3xl font-bold text-green-600">{impact.projectedPassProbability}%</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"></div>

        <div className="text-center">
          <p className="text-sm text-gray-600">Potential Improvement</p>
          <p className="text-2xl font-bold text-emerald-600">+{improvement}%</p>
          <p className="text-xs text-gray-500 mt-2">
            Estimated {impact.estimatedStudyHours} hours of additional study recommended
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm font-semibold">Impact Scale: {impact.improvementPercentage}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${impact.improvementPercentage}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictiveImpactVisualization;
