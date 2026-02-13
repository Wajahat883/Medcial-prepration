"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Clock,
  BookOpen,
  Target,
  ArrowRight,
  History,
  TrendingUp,
  Award,
} from "lucide-react";
import { useTestStore } from "@/store/test-store";
import { useQuestionStore } from "@/store/question-store";

const presets = [
  {
    name: "Quick Practice",
    count: 20,
    time: 30,
    description: "Short session for quick review",
  },
  {
    name: "Standard Test",
    count: 50,
    time: 60,
    description: "Typical practice test length",
  },
  {
    name: "Full Exam",
    count: 150,
    time: 180,
    description: "Simulate real AMC MCQ exam",
  },
];

const recentTests = [
  {
    id: 1,
    date: "2026-01-28",
    score: 78,
    questions: 50,
    category: "All Categories",
  },
  {
    id: 2,
    date: "2026-01-25",
    score: 82,
    questions: 30,
    category: "Cardiology",
  },
  {
    id: 3,
    date: "2026-01-22",
    score: 75,
    questions: 50,
    category: "All Categories",
  },
];

export default function TestPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { startTest, isLoading } = useTestStore();
  const { categories, fetchCategories } = useQuestionStore();

  const [config, setConfig] = useState({
    questionCount: 50,
    category: "",
    duration: 60,
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleStartTest = async () => {
    try {
      const testId = await startTest({
        questionCount: config.questionCount,
        category: config.category || undefined,
        duration: config.duration * 60,
      });

      toast({
        title: "Test started!",
        description: "Good luck with your practice test.",
      });

      router.push(`/test/session?id=${testId}`);
    } catch (error: any) {
      // Fallback: navigate anyway for demo
      router.push("/test/session?id=demo");
    }
  };

  const handlePresetSelect = (preset: (typeof presets)[0]) => {
    setConfig({
      questionCount: preset.count,
      category: config.category,
      duration: preset.time,
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Practice Test</h1>
        <p className="text-slate-600 mt-2">
          Configure your test settings and start practicing
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center">
              <History className="w-6 h-6 text-medical-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">12</p>
              <p className="text-sm text-slate-600">Tests Taken</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">78%</p>
              <p className="text-sm text-slate-600">Average Score</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">85%</p>
              <p className="text-sm text-slate-600">Best Score</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Presets */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Start Presets
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {presets.map((preset) => (
            <Card
              key={preset.name}
              className={`cursor-pointer transition-all hover:shadow-md ${
                config.questionCount === preset.count &&
                config.duration === preset.time
                  ? "border-medical-500 ring-2 ring-medical-500/20"
                  : "hover:border-medical-300"
              }`}
              onClick={() => handlePresetSelect(preset)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">
                    {preset.name}
                  </h3>
                  {config.questionCount === preset.count &&
                    config.duration === preset.time && (
                      <Badge className="bg-medical-100 text-medical-700">
                        Selected
                      </Badge>
                    )}
                </div>
                <p className="text-sm text-slate-600 mb-3">
                  {preset.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {preset.count} Qs
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {preset.time} min
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Test Configuration</CardTitle>
          <CardDescription>
            Customize your practice test settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question Count */}
          <div className="space-y-2">
            <Label htmlFor="questionCount">Number of Questions</Label>
            <div className="flex items-center gap-4">
              <Input
                id="questionCount"
                type="number"
                min={10}
                max={150}
                value={config.questionCount}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    questionCount: parseInt(e.target.value) || 50,
                  })
                }
                className="w-32"
              />
              <input
                type="range"
                min={10}
                max={150}
                value={config.questionCount}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    questionCount: parseInt(e.target.value),
                  })
                }
                className="flex-1"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category (Optional)</Label>
            <Select
              value={config.category}
              onValueChange={(value) =>
                setConfig({ ...config, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Time Limit (minutes)</Label>
            <div className="flex items-center gap-4">
              <Input
                id="duration"
                type="number"
                min={10}
                max={300}
                value={config.duration}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    duration: parseInt(e.target.value) || 60,
                  })
                }
                className="w-32"
              />
              <input
                type="range"
                min={10}
                max={300}
                value={config.duration}
                onChange={(e) =>
                  setConfig({ ...config, duration: parseInt(e.target.value) })
                }
                className="flex-1"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-3">Test Summary</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-medical-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-medical-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Questions</p>
                  <p className="font-semibold text-slate-900">
                    {config.questionCount}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Duration</p>
                  <p className="font-semibold text-slate-900">
                    {config.duration} min
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Category</p>
                  <p className="font-semibold text-slate-900">
                    {config.category || "All"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-medical-600 hover:bg-medical-700 h-12 text-lg"
            onClick={handleStartTest}
            disabled={isLoading}
          >
            {isLoading ? (
              "Starting Test..."
            ) : (
              <>
                Start Test
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tests</CardTitle>
          <CardDescription>Your recent practice test history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTests.map((test) => (
              <div
                key={test.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      test.score >= 80
                        ? "bg-green-100"
                        : test.score >= 60
                          ? "bg-yellow-100"
                          : "bg-red-100"
                    }`}
                  >
                    <span
                      className={`font-bold ${
                        test.score >= 80
                          ? "text-green-600"
                          : test.score >= 60
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {test.score}%
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      {test.category}
                    </p>
                    <p className="text-sm text-slate-600">
                      {test.questions} questions •{" "}
                      {new Date(test.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Review
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
