"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Target,
  TrendingUp,
  Clock,
  ArrowRight,
  Flame,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useDashboardStore } from "@/store/dashboard-store";
import { useAuthStore } from "@/store/auth-store";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { stats, isLoading, fetchStats } = useDashboardStore();
  const { isAuthenticated, isHydrated } = useAuthStore();
  const [isPageHydrated, setIsPageHydrated] = useState(false);

  useEffect(() => {
    setIsPageHydrated(true);
  }, []);

  // Fetch stats once auth is hydrated and page is hydrated
  useEffect(() => {
    if (isPageHydrated && isHydrated && isAuthenticated) {
      console.log("[Dashboard] Fetching stats (auth hydrated, authenticated)");
      fetchStats();
    }
  }, [isPageHydrated, isHydrated, isAuthenticated, fetchStats]);

  const quickActions = [
    {
      title: "Practice Questions",
      description: "Browse the question bank",
      icon: BookOpen,
      href: "/question-bank",
      color: "bg-blue-500",
    },
    {
      title: "Start Test",
      description: "Take a timed practice test",
      icon: Clock,
      href: "/test",
      color: "bg-medical-500",
    },
    {
      title: "View Analytics",
      description: "Check your progress",
      icon: BarChart3,
      href: "/analytics",
      color: "bg-teal-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  // Show welcome message even if stats aren't loaded
  const defaultStats = {
    totalQuestions: 0,
    questionsAttempted: 0,
    completionRate: 0,
    completedTests: 0,
    averageScore: 0,
    accuracy: 0,
    streakDays: 0,
    lastStudyDate: null,
  };

  const displayStats = stats || defaultStats;

  return (
    <div className="space-y-8">
      {/* Welcome Section with Gradient Background */}
      <div className="bg-gradient-to-r from-medical-600 to-teal-500 rounded-2xl p-8 text-white shadow-lg shadow-medical-500/20">
        <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-white/80 text-lg">
          Track your progress and continue your preparation journey.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/question-bank">
            <Button className="bg-white text-medical-600 hover:bg-slate-100">
              Continue Learning
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid with Enhanced Design */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Your Statistics
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-md bg-gradient-to-br from-white to-slate-50 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Questions Attempted
              </CardTitle>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {displayStats?.questionsAttempted || 0}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                of {displayStats?.totalQuestions || 0} total
              </p>
              <Progress
                value={displayStats?.completionRate || 0}
                className="mt-4 h-2"
              />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-white to-slate-50 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Accuracy Rate
              </CardTitle>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {displayStats?.accuracy || 0}%
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {displayStats?.completedTests || 0} tests completed
              </p>
              <Progress
                value={displayStats?.accuracy || 0}
                className="mt-4 h-2"
              />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-white to-slate-50 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Average Score
              </CardTitle>
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-teal-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {displayStats?.averageScore || 0}%
              </div>
              <p className="text-xs text-slate-500 mt-1">Across all tests</p>
              <Progress
                value={displayStats?.averageScore || 0}
                className="mt-4 h-2"
              />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-white to-slate-50 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Study Streak
              </CardTitle>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Flame className="h-5 w-5 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {displayStats?.streakDays || 0}
              </div>
              <p className="text-xs text-slate-500 mt-1">Consecutive days</p>
              <Progress
                value={Math.min(
                  ((displayStats?.streakDays || 0) / 30) * 100,
                  100,
                )}
                className="mt-4 h-2"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="group bg-gradient-to-br from-white to-slate-50 border-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="w-7 h-7 text-white" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-medical-600 transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {action.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-md bg-gradient-to-br from-white to-slate-50">
        <CardHeader>
          <CardTitle className="text-2xl">Recent Activity</CardTitle>
          <CardDescription>
            Your latest study sessions and achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          {displayStats?.lastStudyDate ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-medical-50 to-teal-50 rounded-xl border border-medical-100 hover:border-medical-200 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-medical-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-medical-500/30">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900">Last Study Session</p>
                  <p className="text-sm text-slate-600 mt-1">
                    {new Date(displayStats.lastStudyDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">
                No activity yet. Start practicing today!
              </p>
              <Link href="/question-bank">
                <Button className="mt-6 bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-700 hover:to-teal-600 text-white shadow-lg shadow-medical-500/20">
                  Start Practicing
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
