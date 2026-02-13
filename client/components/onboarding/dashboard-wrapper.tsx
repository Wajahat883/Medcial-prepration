"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTrialTimerStore } from "@/store/trial-timer-store";
import { useAuthStore } from "@/store/auth-store";
import { useTrialTimer } from "@/hooks/useTrialTimer";
import { TrialExpirationModal } from "./trial-expiration-modal";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export function DashboardWrapper({ children }: DashboardWrapperProps) {
  const router = useRouter();
  const { trialDeniedPayment, trialExpired } = useTrialTimerStore();
  const { user } = useAuthStore();
  const {
    formatTimeRemaining,
    shouldShowPaymentModal,
    setShouldShowPaymentModal,
    timeRemaining,
    isTrialActive,
  } = useTrialTimer();

  // Check if user previously denied trial payment
  useEffect(() => {
    if (trialDeniedPayment && user) {
      router.push("/");
    }
  }, [trialDeniedPayment, user, router]);

  // Auto-show modal if trial is expired (only show once when it expires)
  useEffect(() => {
    if (trialExpired && !isTrialActive && user?.selectedPlan === "free") {
      setShouldShowPaymentModal(true);
    }
  }, [
    trialExpired,
    isTrialActive,
    user?.selectedPlan,
    setShouldShowPaymentModal,
  ]);

  return (
    <>
      {/* Trial Timer Badge */}
      {user?.selectedPlan === "free" && isTrialActive && (
        <div className="fixed top-4 right-4 bg-orange-100 border-2 border-orange-500 rounded-lg px-4 py-3 z-40 shadow-lg">
          <p className="text-xs font-semibold text-orange-900 mb-1">
            FREE TRIAL
          </p>
          <p className="text-lg font-bold text-orange-600 text-center font-mono">
            {formatTimeRemaining()}
          </p>
          <p className="text-xs text-orange-700 text-center mt-1">
            Expires soon
          </p>
        </div>
      )}

      {/* Trial Expiration Modal */}
      <TrialExpirationModal
        isOpen={shouldShowPaymentModal}
        onClose={() => setShouldShowPaymentModal(false)}
        timeRemaining={timeRemaining}
      />

      {/* Main Content */}
      {children}
    </>
  );
}
