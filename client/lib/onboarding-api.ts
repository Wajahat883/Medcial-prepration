import { api } from "@/lib/api";

export const onboardingApi = {
  /**
   * Save onboarding step data
   */
  saveStep: async (
    userId: string,
    step: number,
    data: {
      selectedCountry?: string;
      selectedUniversity?: string;
      selectedExam?: string;
      selectedPlan?: string;
    },
  ) => {
    try {
      const response = await api.put(
        `/users/${userId}/onboarding/${step}`,
        data,
      );
      return response;
    } catch (error) {
      console.error(`Failed to save onboarding step ${step}:`, error);
      throw error;
    }
  },

  /**
   * Complete onboarding
   */
  completeOnboarding: async (userId: string) => {
    try {
      const response = await api.put(`/users/${userId}/onboarding/complete`);
      return response;
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
      throw error;
    }
  },

  /**
   * Get onboarding status
   */
  getStatus: async (userId: string) => {
    try {
      const response = await api.get(`/users/${userId}/onboarding/status`);
      return response;
    } catch (error) {
      console.error("Failed to get onboarding status:", error);
      throw error;
    }
  },
};
