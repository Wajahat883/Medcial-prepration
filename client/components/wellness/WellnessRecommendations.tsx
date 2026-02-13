'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WellnessRecommendationsProps {
  recommendations?: string[];
}

const WellnessRecommendations: React.FC<WellnessRecommendationsProps> = ({
  recommendations = [],
}) => {
  if (!recommendations.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>💡 Personalized Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">You're in great shape - keep up your current pace!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>💡 Personalized Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="flex gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-lg flex-shrink-0">
              {idx === 0 ? '🎯' : idx === 1 ? '⏰' : idx === 2 ? '🧠' : '📊'}
            </span>
            <p className="text-sm text-gray-800">{rec}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WellnessRecommendations;
