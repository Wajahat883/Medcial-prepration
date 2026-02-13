"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Target, Calendar, Award } from "lucide-react";
import { useAnalyticsStore } from "@/store/analytics-store";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = [
  "#0ea5e9",
  "#14b8a6",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
];

export default function AnalyticsPage() {
  const {
    categoryPerformance,
    progressOverTime,
    studyStreak,
    isLoading,
    fetchAnalytics,
  } = useAnalyticsStore();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600 mt-1">
          Track your progress and identify areas for improvement
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Current Streak
            </CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {studyStreak?.currentStreak || 0} days
            </div>
            <p className="text-xs text-slate-500">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Categories
            </CardTitle>
            <Target className="h-4 w-4 text-medical-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categoryPerformance?.length || 0}
            </div>
            <p className="text-xs text-slate-500">Being tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Tests This Month
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progressOverTime?.reduce(
                (acc, day) => acc + day.testsCompleted,
                0,
              ) || 0}
            </div>
            <p className="text-xs text-slate-500">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Best Category
            </CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categoryPerformance && categoryPerformance.length > 0
                ? categoryPerformance
                    .reduce((max, cat) =>
                      cat.accuracy > max.accuracy ? cat : max,
                    )
                    .category.substring(0, 10) + "..."
                : "N/A"}
            </div>
            <p className="text-xs text-slate-500">
              {categoryPerformance && categoryPerformance.length > 0
                ? `${Math.round(
                    categoryPerformance.reduce((max, cat) =>
                      cat.accuracy > max.accuracy ? cat : max,
                    ).accuracy,
                  )}% accuracy`
                : "No data"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Progress Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Over Time</CardTitle>
            <CardDescription>
              Your test scores over the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressOverTime || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    formatter={(value: number) => [
                      `${value}%`,
                      "Average Score",
                    ]}
                    labelFormatter={(label) =>
                      new Date(label).toLocaleDateString()
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="averageScore"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={{ fill: "#0ea5e9" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Category</CardTitle>
            <CardDescription>
              Accuracy across different categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryPerformance || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Accuracy"]}
                  />
                  <Bar
                    dataKey="accuracy"
                    fill="#0ea5e9"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>Detailed performance by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryPerformance?.map((category, index) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium text-slate-900">
                      {category.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-600">
                      {category.correct}/{category.attempted} correct
                    </span>
                    <span className="font-semibold text-slate-900 w-12 text-right">
                      {Math.round(category.accuracy)}%
                    </span>
                  </div>
                </div>
                <Progress value={category.accuracy} className="h-2" />
              </div>
            )) || (
              <p className="text-center text-slate-600 py-8">
                No category data available yet. Start practicing to see your
                breakdown!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Study Streak Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Study Streak</CardTitle>
          <CardDescription>Your activity over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-2">
            {studyStreak?.last7Days?.map((day, index) => (
              <div
                key={index}
                className={`w-24 h-24 rounded-lg flex flex-col items-center justify-center gap-1 ${
                  day.studied
                    ? "bg-medical-100 border-2 border-medical-500"
                    : "bg-slate-100 border-2 border-slate-200"
                }`}
              >
                <span className="text-xs text-slate-600">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {new Date(day.date).getDate()}
                </span>
                {day.studied && (
                  <span className="text-xs text-medical-600 font-medium">
                    {day.testsCompleted} test
                    {day.testsCompleted !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            )) || <p className="text-slate-600">No streak data available</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
