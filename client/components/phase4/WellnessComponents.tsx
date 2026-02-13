'use client';

import React from 'react';

interface WellnessData {
  riskLevel: 'low' | 'medium' | 'high';
  declineIndicators: {
    accuracyDeclining: boolean;
    timeDeclining: boolean;
    frequencyDeclining: boolean;
  };
  interventionMessage?: string;
  recommendations: string[];
}

/**
 * Burnout Risk Indicator Component
 * Shows wellness status and burnout risk level with color coding
 */
export const BurnoutRiskIndicator: React.FC<{ wellness: WellnessData }> = ({ wellness }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return { bg: 'bg-red-50', border: 'border-red-300', icon: '🚨', label: 'High Risk' };
      case 'medium':
        return { bg: 'bg-yellow-50', border: 'border-yellow-300', icon: '⚠️', label: 'Medium Risk' };
      case 'low':
      default:
        return { bg: 'bg-green-50', border: 'border-green-300', icon: '✅', label: 'Low Risk' };
    }
  };

  const risk = getRiskColor(wellness.riskLevel);

  return (
    <div className={`${risk.bg} rounded-lg border-2 ${risk.border} p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">{risk.icon}</span>
            Wellness Status
          </h3>
          <p className="text-sm text-gray-600 mt-1">Burnout Risk Analysis</p>
        </div>
        <span className={`px-3 py-1 bg-${wellness.riskLevel === 'high' ? 'red' : wellness.riskLevel === 'medium' ? 'yellow' : 'green'}-100 text-${wellness.riskLevel === 'high' ? 'red' : wellness.riskLevel === 'medium' ? 'yellow' : 'green'}-800 rounded-full text-xs font-bold`}>
          {risk.label}
        </span>
      </div>

      {/* Decline Indicators */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span>{wellness.declineIndicators.accuracyDeclining ? '📉' : '✅'}</span>
          <span className="text-sm text-gray-700">
            {wellness.declineIndicators.accuracyDeclining
              ? 'Accuracy declining the last few days'
              : 'Accuracy stable'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>{wellness.declineIndicators.timeDeclining ? '⏱️' : '✅'}</span>
          <span className="text-sm text-gray-700">
            {wellness.declineIndicators.timeDeclining
              ? 'Taking longer per question'
              : 'Time per question stable'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>{wellness.declineIndicators.frequencyDeclining ? '📋' : '✅'}</span>
          <span className="text-sm text-gray-700">
            {wellness.declineIndicators.frequencyDeclining
              ? 'Practice frequency declining'
              : 'Practice frequency consistent'}
          </span>
        </div>
      </div>

      {/* Intervention Message */}
      {wellness.interventionMessage && (
        <div className="bg-white/80 p-4 rounded-lg border-l-4 border-orange-500 mb-4">
          <p className="text-sm text-gray-800 font-semibold">{wellness.interventionMessage}</p>
        </div>
      )}
    </div>
  );
};

/**
 * Wellness Recommendations Component
 * Shows personalized recommendations based on burnout analysis
 */
export const WellnessRecommendations: React.FC<{ recommendations: string[] }> = ({ recommendations }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span>💡</span> Personalized Recommendations
      </h3>

      {recommendations.length === 0 ? (
        <p className="text-gray-600">You're in great shape - keep up your current pace!</p>
      ) : (
        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="flex gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-lg flex-shrink-0">
                {idx === 0 ? '🎯' : idx === 1 ? '⏰' : idx === 2 ? '🧠' : '📊'}
              </span>
              <p className="text-sm text-gray-800">{rec}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <p className="text-xs text-green-800">
          <strong>💬 Remember:</strong> Taking care of your mental health is crucial. Balance study with
          sleep, exercise, and relaxation.
        </p>
      </div>
    </div>
  );
};

/**
 * Post-Exam Feedback Form Component
 */
export const PostExamFeedbackForm: React.FC<{ onSubmit?: (data: any) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState({
    unfamiliarTopics: [] as string[],
    perceivedDifficulty: 'medium' as 'easy' | 'medium' | 'hard',
    examExperience: {
      timePressure: 3,
      clarity: 3,
      difficulty: 3,
    },
    feedback: '',
  });

  const [topicInput, setTopicInput] = React.useState('');

  const handleAddTopic = () => {
    if (topicInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        unfamiliarTopics: [...prev.unfamiliarTopics, topicInput.trim()],
      }));
      setTopicInput('');
    }
  };

  const handleRemoveTopic = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      unfamiliarTopics: prev.unfamiliarTopics.filter((_, i) => i !== idx),
    }));
  };

  const handleSliderChange = (field: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      examExperience: {
        ...prev.examExperience,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <span>📝</span> Post-Exam Feedback
      </h2>
      <p className="text-gray-600 mb-6">Help us improve by sharing your exam experience</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Unfamiliar Topics */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            What topics felt unfamiliar?
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="e.g., Arrhythmias, ECG interpretation"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTopic())}
            />
            <button
              type="button"
              onClick={handleAddTopic}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.unfamiliarTopics.map((topic, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center gap-2"
              >
                {topic}
                <button
                  type="button"
                  onClick={() => handleRemoveTopic(idx)}
                  className="text-blue-600 hover:text-blue-800 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Perceived Difficulty */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            How difficult was the exam?
          </label>
          <div className="flex gap-3">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, perceivedDifficulty: level }))}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  formData.perceivedDifficulty === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level === 'easy' && '✅ Easy'}
                {level === 'medium' && '⚖️ Medium'}
                {level === 'hard' && '🔥 Hard'}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Sliders */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">Rate your experience (1-5):</label>

          {[
            { key: 'timePressure', label: '⏰ Time Pressure', icon: '⏱️' },
            { key: 'clarity', label: '📋 Question Clarity', icon: '📖' },
            { key: 'difficulty', label: '📊 Difficulty Level', icon: '🎯' },
          ].map((item) => (
            <div key={item.key}>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                <span className="text-lg font-bold text-blue-600">
                  {formData.examExperience[item.key as keyof typeof formData.examExperience]}/5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.examExperience[item.key as keyof typeof formData.examExperience]}
                onChange={(e) => handleSliderChange(item.key, parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          ))}
        </div>

        {/* Free Text Feedback */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Additional comments:</label>
          <textarea
            value={formData.feedback}
            onChange={(e) => setFormData((prev) => ({ ...prev, feedback: e.target.value }))}
            placeholder="Share any other observations about the exam..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default {
  BurnoutRiskIndicator,
  WellnessRecommendations,
  PostExamFeedbackForm,
};