'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Subject {
  id: string;
  name: string;
}

interface ExamSubjectsFilterProps {
  subjects: Subject[];
  onFilter: (subjectIds: string[]) => void;
}

const ExamSubjectsFilter: React.FC<ExamSubjectsFilterProps> = ({ subjects, onFilter }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (subjectId: string) => {
    const newSelected = selected.includes(subjectId)
      ? selected.filter((id) => id !== subjectId)
      : [...selected, subjectId];
    setSelected(newSelected);
    onFilter(newSelected);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {subjects.map((subject) => (
        <Button
          key={subject.id}
          variant={selected.includes(subject.id) ? 'default' : 'outline'}
          onClick={() => handleToggle(subject.id)}
          size="sm"
        >
          {subject.name}
        </Button>
      ))}
    </div>
  );
};

export default ExamSubjectsFilter;
