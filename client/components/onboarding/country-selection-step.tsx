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

const COUNTRIES = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
];

export function CountrySelectionStep() {
  const router = useRouter();
  const { selectedCountry, setCountry, setStep, setError, error, isLoading } =
    useOnboardingStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(COUNTRIES);

  useEffect(() => {
    const filtered = COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCountries(filtered);
  }, [searchTerm]);

  const handleCountrySelect = (code: string) => {
    setCountry(code);
  };

  const handleNext = async () => {
    if (!selectedCountry) {
      setError("Please select a country to continue");
      return;
    }

    try {
      // TODO: Save to database via API
      setStep(2);
      router.push("/onboarding/university");
    } catch (err) {
      setError("Failed to save country selection. Please try again.");
      console.error(err);
    }
  };

  const selectedCountryName = COUNTRIES.find(
    (c) => c.code === selectedCountry,
  )?.name;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Step 1 of 6
            </span>
            <span className="text-sm font-semibold text-blue-600">
              ~5 minutes
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: "16.67%" }}
            ></div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Where are you studying?
        </h1>
        <p className="text-gray-600 mb-6">
          Select your country to see relevant universities and resources.
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
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Country Select */}
        <div className="mb-6">
          <Select
            value={selectedCountry || ""}
            onValueChange={handleCountrySelect}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {filteredCountries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <span>
                    {country.flag} {country.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Country Display */}
        {selectedCountry && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-blue-900">
              Selected Country:
            </p>
            <p className="text-lg font-bold text-blue-600 mt-1">
              {selectedCountryName}
            </p>
          </div>
        )}

        {/* Next Button */}
        <Button
          onClick={handleNext}
          disabled={!selectedCountry || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          {isLoading ? "Loading..." : "NEXT"}
        </Button>

        {/* Info Text */}
        <p className="text-xs text-gray-500 text-center mt-4">
          This field is required to continue
        </p>
      </div>
    </div>
  );
}
