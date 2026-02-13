'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Exam {
  _id: string;
  examId: string;
  displayName: string;
  description?: string;
  pasScore: number;
  totalQuestions: number;
  timeLimit: number;
  subjects: string[];
}

interface ExamSelectorProps {
  availableExams: Exam[];
  userExams: Array<{ examId: string }>;
  primaryExam: string;
  onSelect: (examId: string, targetDate: Date) => void;
  onSwitch: (examId: string) => void;
  isLoading?: boolean;
}

const ExamSelector: React.FC<ExamSelectorProps> = ({ 
  availableExams, 
  userExams, 
  primaryExam,
  onSelect, 
  onSwitch,
  isLoading 
}) => {
  const handleSelectExam = (examId: string) => {
    // Call onSelect with current date as default targetDate
    onSelect(examId, new Date());
  };

  const exams = Array.isArray(availableExams) ? availableExams : [];
  const userExamsList = Array.isArray(userExams) ? userExams : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {exams.map((exam) => {
        const isUserExam = userExamsList.some((ue) => ue.examId === exam.examId);
        const isPrimary = primaryExam === exam.examId;

        return (
          <Card
            key={exam._id}
            className={`cursor-pointer transition-all ${
              isPrimary 
                ? 'ring-2 ring-blue-500 shadow-lg'
                : 'hover:shadow-lg'
            } ${isUserExam ? 'bg-blue-50' : ''}`}
            onClick={() => handleSelectExam(exam.examId)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{exam.displayName}</CardTitle>
                  <CardDescription>
                    {exam.totalQuestions} questions • {exam.timeLimit} mins
                  </CardDescription>
                </div>
                {isPrimary && (
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                    Primary
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{exam.description || 'Medical examination'}</p>
              <div className="text-xs text-gray-600 mb-3">
                <p>Pass Score: {exam.pasScore}%</p>
              </div>
              {isUserExam && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSwitch(exam.examId);
                  }}
                  className="w-full text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Switch to Primary
                </button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ExamSelector;
