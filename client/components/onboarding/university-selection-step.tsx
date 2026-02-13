"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock university data - in production, fetch from API
const UNIVERSITIES_BY_COUNTRY: Record<
  string,
  Array<{ id: string; name: string }>
> = {
  US: [
    { id: "harvard", name: "Harvard University" },
    { id: "stanford", name: "Stanford University" },
    { id: "mit", name: "Massachusetts Institute of Technology" },
    { id: "yale", name: "Yale University" },
    { id: "columbia", name: "Columbia University" },
    { id: "penn", name: "University of Pennsylvania" },
    { id: "duke", name: "Duke University" },
    { id: "chicago", name: "University of Chicago" },
  ],
  CA: [
    { id: "toronto", name: "University of Toronto" },
    { id: "mcgill", name: "McGill University" },
    { id: "bc", name: "University of British Columbia" },
    { id: "alberta", name: "University of Alberta" },
  ],
  UK: [
    { id: "oxford", name: "University of Oxford" },
    { id: "cambridge", name: "University of Cambridge" },
    { id: "ucl", name: "University College London" },
    { id: "lse", name: "London School of Economics" },
  ],
  AU: [
    { id: "melbourne", name: "University of Melbourne" },
    { id: "sydney", name: "University of Sydney" },
    { id: "unsw", name: "UNSW Sydney" },
    { id: "anu", name: "Australian National University" },
  ],
  IN: [
    { id: "aiims", name: "All India Institute of Medical Sciences" },
    { id: "delhi", name: "University of Delhi" },
    { id: "mumbai", name: "University of Mumbai" },
    { id: "pune", name: "University of Pune" },
  ],
  SG: [
    { id: "nus", name: "National University of Singapore" },
    { id: "ntu", name: "Nanyang Technological University" },
    { id: "smu", name: "Singapore Management University" },
  ],
  AE: [
    { id: "auh", name: "American University of Health Sciences" },
    { id: "uae", name: "United Arab Emirates University" },
  ],
  NZ: [
    { id: "auckland", name: "University of Auckland" },
    { id: "otago", name: "University of Otago" },
    { id: "waikato", name: "University of Waikato" },
  ],
  IE: [
    { id: "tcd", name: "Trinity College Dublin" },
    { id: "ucd", name: "University College Dublin" },
  ],
  PK: [
    { id: "aga", name: "Aga Khan University" },
    { id: "quaid", name: "Quaid-i-Azam University" },
  ],
  BD: [
    { id: "dhaka", name: "University of Dhaka" },
    { id: "buet", name: "Bangladesh University of Engineering and Technology" },
  ],
  NG: [
    { id: "uiui", name: "University of Ibadan" },
    { id: "ui", name: "University of Lagos" },
  ],
};

export function UniversitySelectionStep() {
  const router = useRouter();
  const {
    selectedCountry,
    selectedUniversity,
    setUniversity,
    setStep,
    setError,
    error,
    isLoading,
  } = useOnboardingStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState<
    Array<{ id: string; name: string }>
  >([]);

  useEffect(() => {
    if (!selectedCountry) {
      router.push("/onboarding/country");
      return;
    }

    const universities = UNIVERSITIES_BY_COUNTRY[selectedCountry] || [];
    const filtered = universities.filter((uni) =>
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredUniversities(filtered);
  }, [selectedCountry, searchTerm, router]);

  const handleUniversitySelect = (id: string) => {
    setUniversity(id);
  };

  const handleNext = async () => {
    if (!selectedUniversity) {
      setError("Please select a university to continue");
      return;
    }

    try {
      // TODO: Save to database via API
      setStep(3);
      router.push("/onboarding/exam");
    } catch (err) {
      setError("Failed to save university selection. Please try again.");
      console.error(err);
    }
  };

  const handleBack = () => {
    router.push("/onboarding/country");
  };

  const selectedUniversityName = UNIVERSITIES_BY_COUNTRY[
    selectedCountry || ""
  ]?.find((u) => u.id === selectedUniversity)?.name;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Step 2 of 6
            </span>
            <span className="text-sm font-semibold text-blue-600">
              ~3 minutes
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: "33.33%" }}
            ></div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Select your university
        </h1>
        <p className="text-gray-600 mb-6">
          This helps us customize your learning experience.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Search Input */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search universities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* University Select */}
        <div className="mb-6">
          <Select
            value={selectedUniversity || ""}
            onValueChange={handleUniversitySelect}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a university" />
            </SelectTrigger>
            <SelectContent>
              {filteredUniversities.map((uni) => (
                <SelectItem key={uni.id} value={uni.id}>
                  {uni.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected University Display */}
        {selectedUniversity && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-blue-900">
              Selected University:
            </p>
            <p className="text-lg font-bold text-blue-600 mt-1">
              {selectedUniversityName}
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
            disabled={!selectedUniversity || isLoading}
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
