"use client";

import { useRouter } from "next/navigation";
import { useTrialTimerStore } from "@/store/trial-timer-store";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { useTrialTimer } from "@/hooks/useTrialTimer";

interface TrialExpirationModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeRemaining: number;
}

export function TrialExpirationModal({
  isOpen,
  onClose,
  timeRemaining,
}: TrialExpirationModalProps) {
  const router = useRouter();
  const { denyTrialPayment } = useTrialTimerStore();
  const { logout } = useAuthStore();

  const isExpired = timeRemaining <= 0;

  const handleUpgradeNow = () => {
    // Close modal first, then redirect to premium packages selection
    onClose();
    router.push("/onboarding/premium-packages");
  };

  const handleDenyPayment = () => {
    // Close modal, deny payment, logout, and redirect to home
    onClose();
    denyTrialPayment();
    logout();
    router.push("/");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        {/* Icon */}
        <div className="text-6xl text-center mb-4">⏰</div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {isExpired ? "Trial Period Ended" : "Trial Time Running Out"}
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">
          {isExpired
            ? "Your free trial has ended. Upgrade to a premium plan to continue using all features."
            : `Your free trial ends in ${Math.ceil(timeRemaining / 1000)} seconds. Upgrade now to continue learning.`}
        </p>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">✨</span>
            <div>
              <p className="font-semibold text-blue-900 mb-1">
                Upgrade to Premium
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ Unlimited access to all questions</li>
                <li>✓ Advanced practice tests</li>
                <li>✓ Detailed analytics & tracking</li>
                <li>✓ Offline mode & more</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleUpgradeNow}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Upgrade Now
          </Button>

          <Button
            onClick={handleDenyPayment}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
          >
            Not Interested
          </Button>
        </div>

        {/* Info Text */}
        <p className="text-xs text-gray-500 text-center mt-4">
          You'll be logged out if you decline. Free trial can only be used once.
        </p>
      </div>
    </div>
  );
}
