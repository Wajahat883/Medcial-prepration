import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PremiumPackage {
  id: string;
  name: string;
  price: number;
  pastPapers: number | "unlimited";
  accessDays: number;
  dailyPracticeHours: number;
  features: string[];
  color: "blue" | "purple" | "gold";
  badge?: string;
}

export interface PremiumPackageState {
  selectedPackage: string | null;
  selectedUniversity: string | null;
  packages: PremiumPackage[];
}

export interface PremiumPackageStore extends PremiumPackageState {
  selectPackage: (packageId: string) => void;
  setUniversity: (university: string) => void;
  getPackages: () => PremiumPackage[];
  resetSelection: () => void;
}

const PREMIUM_PACKAGES: PremiumPackage[] = [
  {
    id: "premium-basic",
    name: "Starter",
    price: 19.99,
    pastPapers: 20,
    accessDays: 15,
    dailyPracticeHours: 3,
    color: "blue",
    features: [
      "20 past papers from selected university",
      "15 days access to university content",
      "3 hours daily practice limit",
      "Performance analytics",
      "Mobile app access",
    ],
  },
  {
    id: "premium-standard",
    name: "Professional",
    price: 34.99,
    pastPapers: 50,
    accessDays: 30,
    dailyPracticeHours: 4,
    color: "purple",
    badge: "POPULAR",
    features: [
      "50 past papers from selected university",
      "30 days access to university content",
      "4 hours daily practice limit",
      "Advanced analytics & insights",
      "Study recommendations",
      "Priority support",
      "Mobile app access",
    ],
  },
  {
    id: "premium-ultimate",
    name: "Ultimate",
    price: 99.99,
    pastPapers: "unlimited",
    accessDays: 365,
    dailyPracticeHours: 24,
    color: "gold",
    badge: "BEST VALUE",
    features: [
      "All past papers from selected university",
      "365 days access to university content",
      "Unlimited daily practice",
      "Complete analytics dashboard",
      "AI-powered study recommendations",
      "Premium support 24/7",
      "Offline download all materials",
      "Mobile app access",
      "Lifetime progress backup",
    ],
  },
];

export const usePremiumPackageStore = create<PremiumPackageStore>()(
  persist(
    (set) => ({
      selectedPackage: null,
      selectedUniversity: null,
      packages: PREMIUM_PACKAGES,

      selectPackage: (packageId: string) => {
        set({ selectedPackage: packageId });
      },

      setUniversity: (university: string) => {
        set({ selectedUniversity: university });
      },

      getPackages: () => PREMIUM_PACKAGES,

      resetSelection: () => {
        set({
          selectedPackage: null,
          selectedUniversity: null,
        });
      },
    }),
    {
      name: "premium-package-store",
    },
  ),
);
