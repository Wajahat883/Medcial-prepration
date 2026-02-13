"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

/**
 * Route Guard Component
 * Checks if onboarding is complete before allowing access to protected routes.
 * Redirects to onboarding if not complete.
 */
export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Routes that require onboarding completion
  const protectedRoutes = [
    "/dashboard",
    "/analytics",
    "/question-bank",
    "/test",
    "/bookmarks",
    "/settings",
  ];

  // Routes that don't require onboarding
  const publicRoutes = ["/login", "/register", "/", "/forgot-password"];

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (!isHydrated) return;

    // Skip guard for public routes
    if (isPublicRoute) {
      setIsChecking(false);
      return;
    }

    if (!user) {
      setIsChecking(false);
      return;
    }

    // Check onboarding completion
    const onboardingComplete = user.onboardingComplete || false;

    // If route is protected and onboarding not complete, redirect
    if (isProtectedRoute && !onboardingComplete) {
      router.push("/onboarding/country");
      return;
    }

    // If user is on onboarding routes but already completed, redirect to dashboard
    if (
      pathname.startsWith("/onboarding") &&
      onboardingComplete &&
      pathname !== "/onboarding/success"
    ) {
      router.push("/dashboard");
      return;
    }

    setIsChecking(false);
  }, [user, pathname, isProtectedRoute, router, isHydrated]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
