'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExamReadinessUpsellProps {
  passProbability?: number;
  estimatedHours?: number;
  onUpgrade?: () => void;
}

const ExamReadinessUpsell: React.FC<ExamReadinessUpsellProps> = ({
  passProbability = 65,
  estimatedHours = 20,
  onUpgrade,
}) => {
  return (
    <Card className="border-2 border-blue-300 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-blue-900">📈 Upgrade to Premium</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-700 mb-2">
            Your current pass probability: <span className="font-bold text-blue-600">{passProbability}%</span>
          </p>
          <p className="text-sm text-gray-700">
            With premium features, you could improve to <span className="font-bold text-green-600">85%+</span>
          </p>
        </div>

        <div className="bg-white/60 p-3 rounded">
          <p className="text-xs font-semibold text-gray-800 mb-2">Premium Benefits:</p>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>✨ AI-powered personalized study plans</li>
            <li>📊 Advanced analytics and insights</li>
            <li>🎯 Targeted weak area focus</li>
            <li>⏱️ Estimated {estimatedHours}h study time reduction</li>
          </ul>
        </div>

        <Button
          onClick={onUpgrade}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Upgrade Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessUpsell;
