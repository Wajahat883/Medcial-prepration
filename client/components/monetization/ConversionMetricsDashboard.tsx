'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ConversionMetrics {
  totalTeasersShown: number;
  totalUpsellClicks: number;
  totalConversions: number;
  ctcRate: string | number;
  conversionRate: string | number;
}

interface ConversionMetricsDashboardProps {
  metrics?: ConversionMetrics;
}

const ConversionMetricsDashboard: React.FC<ConversionMetricsDashboardProps> = ({ metrics }) => {
  if (!metrics) {
    return <div>Loading conversion metrics...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-600 uppercase">Teasers Shown</p>
            <p className="text-2xl font-bold text-blue-600">{metrics.totalTeasersShown}</p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-600 uppercase">Upsell Clicks</p>
            <p className="text-2xl font-bold text-purple-600">{metrics.totalUpsellClicks}</p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-600 uppercase">Conversions</p>
            <p className="text-2xl font-bold text-green-600">{metrics.totalConversions}</p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-600 uppercase">Conv. Rate</p>
            <p className="text-2xl font-bold text-emerald-600">
              {typeof metrics.conversionRate === 'number' 
                ? metrics.conversionRate.toFixed(1) 
                : parseFloat(metrics.conversionRate as string).toFixed(1)}%
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-600 uppercase">CTC Rate</p>
            <p className="text-2xl font-bold text-indigo-600">
              {typeof metrics.ctcRate === 'number'
                ? metrics.ctcRate.toFixed(1)
                : parseFloat(metrics.ctcRate as string).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded">
          <p className="text-xs text-gray-700">
            Conversion funnel analyzing premium feature adoption and user engagement patterns
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionMetricsDashboard;
