"use client";

import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding-store";
import { useTrialTimerStore } from "@/store/trial-timer-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SUBSCRIPTION_PLANS = [
  {
    id: "free",
    name: "7-Day Free Trial",
    price: "$0",
    duration: "7 days",
    features: [
      "Full access to all questions",
      "Practice tests",
      "Progress tracking",
      "Basic analytics",
      "Mobile app access",
      "Auto-renews to Premium after trial",
    ],
    badge: "RECOMMENDED",
    popular: true,
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    price: "$9.99",
    duration: "per month",
    features: [
      "Unlimited access to all questions",
      "Advanced practice tests",
      "Detailed analytics",
      "Study streaks",
      "Offline download",
      "Ad-free experience",
      "24/7 support",
    ],
    popular: false,
  },
  {
    id: "quarterly",
    name: "Quarterly Plan",
    price: "$24.99",
    duration: "per 3 months",
    features: [
      "Everything in Monthly",
      "Save 17%",
      "Personalized study plan",
      "AI-powered recommendations",
      "Priority support",
    ],
    popular: false,
  },
  {
    id: "yearly",
    name: "Annual Plan",
    price: "$79.99",
    duration: "per year",
    features: [
      "Everything in Quarterly",
      "Save 33%",
      "Lifetime progress backup",
      "Exclusive study materials",
      "VIP community access",
    ],
    badge: "BEST VALUE",
    popular: false,
  },
];

export function SubscriptionPlanStep() {
  const router = useRouter();
  const {
    selectedCountry,
    selectedPlan,
    setPlan,
    setStep,
    setError,
    error,
    isLoading,
  } = useOnboardingStore();

  const { startTrial } = useTrialTimerStore();

  if (!selectedCountry) {
    router.push("/onboarding/country");
    return null;
  }

  const handlePlanSelect = (planId: string) => {
    setPlan(planId as "free" | "monthly" | "quarterly" | "yearly");
  };

  const handleNext = async () => {
    if (!selectedPlan) {
      setError("Please select a subscription plan to continue");
      return;
    }

    try {
      // If free plan, start trial timer and complete onboarding
      if (selectedPlan === "free") {
        startTrial();
        setStep(6);
        router.push("/onboarding/success");
      } else {
        // If paid plan, go to payment
        setStep(5);
        router.push("/onboarding/payment");
      }
    } catch (err) {
      setError("Failed to save subscription plan. Please try again.");
      console.error(err);
    }
  };

  const handleBack = () => {
    router.push("/onboarding/exam");
  };

  const selectedPlanName = SUBSCRIPTION_PLANS.find(
    (p) => p.id === selectedPlan,
  )?.name;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Step 4 of 6
            </span>
            <span className="text-sm font-semibold text-blue-600">
              ~3 minutes
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: "66.67%" }}
            ></div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Your Plan
          </h1>
          <p className="text-gray-600">
            Start with a free 7-day trial or unlock premium features today
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <Card
              key={plan.id}
              onClick={() => handlePlanSelect(plan.id)}
              className={`p-6 cursor-pointer transition-all border-2 relative ${
                selectedPlan === plan.id
                  ? "border-blue-600 bg-blue-50 shadow-lg transform scale-105"
                  : "border-gray-200 bg-white hover:border-gray-300"
              } ${plan.popular ? "lg:scale-110 lg:transform" : ""}`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-900">{plan.name}</h3>
                <div>
                  <span className="text-3xl font-bold text-blue-600">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 text-sm ml-2">
                    {plan.duration}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-2 text-sm text-gray-600">
                  {plan.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Checkmark for selected */}
                {selectedPlan === plan.id && (
                  <div className="text-blue-600 text-2xl text-center pt-2">
                    ✓
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Plan Display */}
        {selectedPlan && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-blue-900">
              Selected Plan:
            </p>
            <p className="text-lg font-bold text-blue-600 mt-1">
              {selectedPlanName}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 font-semibold py-2 rounded-lg"
          >
            BACK
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedPlan || isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            {isLoading ? "Loading..." : "NEXT"}
          </Button>
        </div>

        {/* Info Text */}
        <p className="text-xs text-gray-500 text-center mt-4">
          This field is required to continue. You can change your plan anytime.
        </p>
      </div>
    </div>
  );
}
