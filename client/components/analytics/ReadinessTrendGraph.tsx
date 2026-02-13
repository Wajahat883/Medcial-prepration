import React, { useEffect, useState } from 'react';
import { useReadinessStore } from '@/store/readiness-store';

export default function ReadinessTrendGraph({ userId }: { userId: string }) {
  const { history, fetchHistory, isLoading } = useReadinessStore();
  const [points, setPoints] = useState<number[]>([]);

  useEffect(() => { if (userId) fetchHistory(userId); }, [userId]);
  useEffect(() => { setPoints(history.map((h: any) => h.score)); }, [history]);

  if (isLoading) return <div>Loading trend...</div>;
  if (!points || !points.length) return <div>No trend data</div>;

  return (
    <div className="readiness-trend">
      <div>Trend (last {points.length}): {points.join(', ')}</div>
    </div>
  );
}
