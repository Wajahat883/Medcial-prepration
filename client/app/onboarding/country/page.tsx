import { CountrySelectionStep } from "@/components/onboarding/country-selection-step";

export const metadata = {
  title: "Select Country - Medical Exam Prep",
  description: "Select your country to continue with onboarding",
};

export default function CountryPage() {
  return <CountrySelectionStep />;
}
