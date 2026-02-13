import React, { useEffect } from 'react';
import { useRevisionStrategyStore } from '@/store/revision-strategy-store';

export default function RevisionBuckets({ userId }: { userId: string }) {
  const { buckets, fetchBuckets, generateBuckets, isLoading } = useRevisionStrategyStore();

  useEffect(() => { if (userId) fetchBuckets(userId); }, [userId]);

  return (
    <div>
      <button onClick={() => generateBuckets(userId)} disabled={isLoading}>Regenerate Buckets</button>
      <ul>
        {buckets.map((b: any) => (
          <li key={b._id}>{b.bucketType} — {b.questions?.length || 0} questions</li>
        ))}
      </ul>
    </div>
  );
}
