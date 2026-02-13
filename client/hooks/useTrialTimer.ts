import { useEffect, useState } from "react";
import { useTrialTimerStore } from "@/store/trial-timer-store";

export function useTrialTimer() {
  const {
    trialStartTime,
    getTimeRemaining,
    isTrialActive,
    expireTrial,
    TRIAL_DURATION_MS,
  } = useTrialTimerStore();

  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [shouldShowPaymentModal, setShouldShowPaymentModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (!trialStartTime) {
      setTimeRemaining(TRIAL_DURATION_MS);
      return;
    }

    const interval = setInterval(() => {
      const remaining = getTimeRemaining();
      setTimeRemaining(remaining);

      // Show payment modal when trial is about to expire (30 seconds left)
      if (remaining <= 30000 && remaining > 0) {
        setShouldShowPaymentModal(true);
      }

      // Expire trial when time runs out
      if (remaining <= 0) {
        expireTrial();
        setShouldShowPaymentModal(true);
        clearInterval(interval);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [trialStartTime, getTimeRemaining, expireTrial, TRIAL_DURATION_MS]);

  const formatTimeRemaining = () => {
    const totalSeconds = Math.ceil(timeRemaining / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return {
    timeRemaining,
    formatTimeRemaining,
    shouldShowPaymentModal,
    setShouldShowPaymentModal,
    isTrialActive: isTrialActive(),
  };
}
