import React from 'react';
import { useReadinessStore } from '@/store/readiness-store';

export default function ReadinessBreakdown({ userId }: { userId: string }) {
  const { breakdown: components, fetchBreakdown, isLoading } = useReadinessStore();

  React.useEffect(() => { if (userId) fetchBreakdown(userId); }, [userId]);

  if (isLoading) return <div>Loading breakdown...</div>;
  if (!components) return <div>No breakdown available</div>;

  return (
    <div className="readiness-breakdown">
      <div>Accuracy: {components.accuracy}%</div>
      <div>Avg time (s): {components.time}</div>
      <div>Stability: {components.stability}%</div>
      <div>Coverage: {components.coverage}%</div>
      <div>Consistency: {components.consistency}%</div>
    </div>
  );
}
