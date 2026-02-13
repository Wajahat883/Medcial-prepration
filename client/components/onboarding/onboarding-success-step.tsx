"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding-store";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";

export function OnboardingSuccessStep() {
  const router = useRouter();
  const { completeOnboarding, selectedCountry } = useOnboardingStore();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    if (!selectedCountry) {
      router.push("/onboarding/country");
    }
  }, [selectedCountry, router]);

  const handleDashboard = async () => {
    try {
      // Save onboarding completion to database via API
      // TODO: POST /api/users/{id}/onboarding/complete
      completeOnboarding();

      // Update user in auth store to reflect onboarding completion
      if (user) {
        setUser({
          ...user,
          onboardingComplete: true,
        });
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Failed to complete onboarding:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Onboarding Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>

        {/* Success Icon */}
        <div className="mb-6 text-6xl">🎉</div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          You're All Set!
        </h1>
        <p className="text-gray-600 mb-6">
          Your profile is now complete and personalized. Let's dive into your
          learning journey!
        </p>

        {/* Success Details */}
        <div className="space-y-3 mb-8 text-left bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center">
            <span className="text-green-600 text-lg mr-3">✓</span>
            <span className="text-gray-700">Profile configured</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-600 text-lg mr-3">✓</span>
            <span className="text-gray-700">Subscription activated</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-600 text-lg mr-3">✓</span>
            <span className="text-gray-700">Ready to learn</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleDashboard}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors text-lg"
        >
          Go to Dashboard
        </Button>

        {/* Motivational Text */}
        <p className="text-sm text-gray-500 text-center mt-6">
          You're now ready to ace your medical exam. Good luck! 🚀
        </p>
      </div>
    </div>
  );
}
