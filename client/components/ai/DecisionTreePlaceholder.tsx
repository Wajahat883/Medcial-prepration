import React from 'react';

export default function DecisionTreePlaceholder({ data }: { data?: any }) {
  return (
    <div className="decision-tree-placeholder">
      <h4>Decision Tree (placeholder)</h4>
      <pre style={{ fontSize: 12 }}>{JSON.stringify(data || { note: 'No data' }, null, 2)}</pre>
    </div>
  );
}
