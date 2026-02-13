'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BurnoutRiskIndicatorProps {
  wellness?: any;
  onReviewRecommendations?: () => void;
}

const BurnoutRiskIndicator: React.FC<BurnoutRiskIndicatorProps> = ({
  wellness,
  onReviewRecommendations,
}) => {
  if (!wellness) {
    return <div>Loading wellness data...</div>;
  }

  const riskColors: Record<string, string> = {
    low: 'from-green-50 to-green-100 border-green-300',
    medium: 'from-yellow-50 to-yellow-100 border-yellow-300',
    high: 'from-red-50 to-red-100 border-red-300',
  };

  const riskLabel: Record<string, string> = {
    low: '✅ Low Risk',
    medium: '⚠️ Medium Risk',
    high: '🔴 High Risk',
  };

  return (
    <Card className={`bg-gradient-to-br ${riskColors[wellness.riskLevel]} border-2`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Wellness Status</span>
          <span className="text-2xl">{riskLabel[wellness.riskLevel]}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700">{wellness.interventionMessage}</p>
        <Button onClick={onReviewRecommendations} className="w-full">
          View Recommendations
        </Button>
      </CardContent>
    </Card>
  );
};

export default BurnoutRiskIndicator;
