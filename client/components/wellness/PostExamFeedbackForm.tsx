'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFeedbackFormStore } from '@/store/feedback-form-store';
import { usePhase4Store } from '@/store/phase4-store';

const PostExamFeedbackForm: React.FC = () => {
  const {
    feedbackTopics,
    feedbackDifficulty,
    feedbackExperience,
    isSubmittingFeedback,
    setFeedbackTopics,
    setFeedbackDifficulty,
    setFeedbackExperience,
    setIsSubmittingFeedback,
    resetFeedback,
  } = useFeedbackFormStore();

  const { submitPostExamFeedback } = usePhase4Store();

  const handleSubmit = async () => {
    setIsSubmittingFeedback(true);
    try {
      await submitPostExamFeedback('', {
        topics: feedbackTopics,
        difficulty: feedbackDifficulty,
        experience: feedbackExperience,
      });
      resetFeedback();
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post-Exam Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Difficulty Level</label>
          <input
            type="range"
            min="1"
            max="10"
            value={feedbackDifficulty}
            onChange={(e) => setFeedbackDifficulty(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-gray-600 mt-1">Current: {feedbackDifficulty}/10</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Experience Rating</label>
          <input
            type="range"
            min="1"
            max="10"
            value={feedbackExperience}
            onChange={(e) => setFeedbackExperience(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-gray-600 mt-1">Current: {feedbackExperience}/10</p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmittingFeedback}
          className="w-full"
        >
          {isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostExamFeedbackForm;
