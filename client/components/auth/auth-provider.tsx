"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

const publicRoutes = ["/", "/login", "/register", "/forgot-password"];
const protectedRoutes = [
  "/dashboard",
  "/analytics",
  "/question-bank",
  "/test",
  "/bookmarks",
  "/settings",
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, isHydrated: authIsHydrated } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for auth store to be hydrated from localStorage
    if (authIsHydrated) {
      setIsHydrated(true);
    }
  }, [authIsHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    const isPublicRoute = publicRoutes.includes(pathname);
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route),
    );
    const isOnboardingRoute = pathname.startsWith("/onboarding");

    // Redirect unauthenticated users away from protected routes
    if (!isAuthenticated && !isPublicRoute) {
      router.push("/login");
      return;
    }

    // Redirect authenticated users from auth pages to dashboard or onboarding
    if (isAuthenticated && isPublicRoute && pathname !== "/") {
      const onboardingComplete = user?.onboardingComplete || false;
      if (onboardingComplete) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding/country");
      }
      return;
    }

    // Redirect to onboarding if accessing protected routes without completing onboarding
    if (isAuthenticated && isProtectedRoute && !isOnboardingRoute) {
      const onboardingComplete = user?.onboardingComplete || false;
      if (!onboardingComplete) {
        router.push("/onboarding/country");
        return;
      }
    }

    // Redirect away from onboarding if already completed
    // BUT allow access to premium upgrade pages during trial
    if (
      isAuthenticated &&
      isOnboardingRoute &&
      pathname !== "/onboarding/success"
    ) {
      const onboardingComplete = user?.onboardingComplete || false;
      const isPremiumUpgradePath =
        pathname === "/onboarding/premium-packages" ||
        pathname === "/onboarding/payment-premium" ||
        pathname === "/onboarding/payment";

      if (onboardingComplete && !isPremiumUpgradePath) {
        router.push("/dashboard");
        return;
      }
    }
  }, [isAuthenticated, pathname, router, isHydrated, user]);

  return <>{children}</>;
}
