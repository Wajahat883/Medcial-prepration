'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatisticData {
  total: number;
  completed: number;
  averageScore: number;
  strength: string;
  weakness: string;
}

interface ExamStatisticsProps {
  stats?: StatisticData;
}

const ExamStatistics: React.FC<ExamStatisticsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.total || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-600">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats?.completed || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-600">Average Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats?.averageScore || 0}%</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-yellow-600">Strength</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-semibold text-yellow-600">{stats?.strength || '-'}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-red-600">Weakness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-semibold text-red-600">{stats?.weakness || '-'}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamStatistics;
