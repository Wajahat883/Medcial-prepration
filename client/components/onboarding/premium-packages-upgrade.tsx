"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { usePremiumPackageStore } from "@/store/premium-package-store";
import { useOnboardingStore } from "@/store/onboarding-store";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export function PremiumPackagesUpgrade() {
  const router = useRouter();
  const { selectPackage, selectedPackage, getPackages } =
    usePremiumPackageStore();
  const { user } = useAuthStore();
  const onboardingStore = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(true);

  // Get university from either user (after trial) or onboarding store (during onboarding)
  const university =
    user?.selectedUniversity || onboardingStore.selectedUniversity;

  const packages = getPackages();

  useEffect(() => {
    if (user && university) {
      setIsLoading(false);
    } else if (!user) {
      router.push("/");
    } else if (!university) {
      router.push("/onboarding/university");
    }
  }, [user, university, router]);

  const handleSelectPackage = (packageId: string) => {
    selectPackage(packageId);
  };

  const handleContinue = () => {
    if (!selectedPackage) {
      return;
    }
    // Proceed to payment with selected package
    router.push("/onboarding/payment-premium");
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading premium plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Upgrade Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Get premium access for{" "}
            <span className="font-semibold text-blue-600">{university}</span>
          </p>
          <p className="text-gray-600 mt-2">
            Choose the plan that fits your study needs
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {packages.map((pkg) => {
            const isSelected = selectedPackage === pkg.id;
            const colorClasses = {
              blue: "border-blue-300 bg-blue-50 hover:bg-blue-100",
              purple:
                "border-purple-300 bg-purple-50 hover:bg-purple-100 ring-2 ring-purple-300",
              gold: "border-yellow-300 bg-yellow-50 hover:bg-yellow-100",
            };

            return (
              <Card
                key={pkg.id}
                className={`relative p-6 cursor-pointer transition-all ${colorClasses[pkg.color]} ${
                  isSelected ? "ring-2 ring-offset-2 ring-blue-600" : ""
                } ${pkg.color === "purple" ? "transform scale-105" : ""}`}
                onClick={() => handleSelectPackage(pkg.id)}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 px-3 py-1">
                      {pkg.badge}
                    </Badge>
                  </div>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Package Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {pkg.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      ${pkg.price.toFixed(2)}
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-gray-900">
                      {pkg.pastPapers === "unlimited"
                        ? "∞ Past Papers"
                        : `${pkg.pastPapers} Past Papers`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-gray-900">
                      {pkg.accessDays} Days Access
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-gray-900">
                      {pkg.dailyPracticeHours === 24
                        ? "∞ Daily Practice"
                        : `${pkg.dailyPracticeHours} Hours Daily`}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Select Button */}
                <Button
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    isSelected
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {isSelected ? "✓ Selected" : "Select Plan"}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="px-8 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedPackage}
            className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Payment
          </Button>
        </div>

        {/* Info */}
        <p className="text-center text-gray-600 text-sm mt-8">
          All plans include 30-day money-back guarantee. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
