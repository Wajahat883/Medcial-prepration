"use client";

import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const EXAMS = [
  {
    id: "usmle",
    name: "USMLE",
    description: "US Medical Licensing Examination",
    icon: "🇺🇸",
  },
  {
    id: "amc",
    name: "AMC",
    description: "Australian Medical Council",
    icon: "🇦🇺",
  },
  {
    id: "mccqe",
    name: "MCCQE",
    description: "Medical Council of Canada",
    icon: "🇨🇦",
  },
  {
    id: "plab",
    name: "PLAB",
    description: "Professional and Linguistic Assessment Board",
    icon: "🇬🇧",
  },
  {
    id: "neet",
    name: "NEET",
    description: "National Eligibility cum Entrance Test",
    icon: "🇮🇳",
  },
  {
    id: "med-exit",
    name: "MED-EXIT",
    description: "Medical Examination in Pakistan",
    icon: "🇵🇰",
  },
];

export function ExamTypeSelectionStep() {
  const router = useRouter();
  const {
    selectedCountry,
    selectedExam,
    setExam,
    setStep,
    setError,
    error,
    isLoading,
  } = useOnboardingStore();

  if (!selectedCountry) {
    router.push("/onboarding/country");
    return null;
  }

  const handleExamSelect = (id: string) => {
    setExam(id);
  };

  const handleNext = async () => {
    if (!selectedExam) {
      setError("Please select an exam to continue");
      return;
    }

    try {
      // TODO: Save to database via API
      setStep(4);
      router.push("/onboarding/subscription");
    } catch (err) {
      setError("Failed to save exam selection. Please try again.");
      console.error(err);
    }
  };

  const handleBack = () => {
    router.push("/onboarding/university");
  };

  const selectedExamName = EXAMS.find((e) => e.id === selectedExam)?.name;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Step 3 of 6
            </span>
            <span className="text-sm font-semibold text-blue-600">
              ~2 minutes
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Which exam are you preparing for?
        </h1>
        <p className="text-gray-600 mb-6">
          Select your target medical examination.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Exam Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {EXAMS.map((exam) => (
            <Card
              key={exam.id}
              onClick={() => handleExamSelect(exam.id)}
              className={`p-4 cursor-pointer transition-all border-2 ${
                selectedExam === exam.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{exam.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{exam.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {exam.description}
                  </p>
                </div>
                {selectedExam === exam.id && (
                  <div className="text-blue-600 text-2xl">✓</div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Exam Display */}
        {selectedExam && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-blue-900">Target Exam:</p>
            <p className="text-lg font-bold text-blue-600 mt-1">
              {selectedExamName}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mb-4">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg"
          >
            BACK
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedExam || isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            {isLoading ? "Loading..." : "NEXT"}
          </Button>
        </div>

        {/* Info Text */}
        <p className="text-xs text-gray-500 text-center">
          This field is required to continue
        </p>
      </div>
    </div>
  );
}
