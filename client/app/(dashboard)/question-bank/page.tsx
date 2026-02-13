'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  Bookmark,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useQuestionStore } from '@/store/question-store'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export default function QuestionBankPage() {
  const { 
    questions, 
    categories,
    pagination, 
    isLoading, 
    filters,
    fetchQuestions, 
    fetchCategories,
    setFilters,
  } = useQuestionStore()

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchCategories()
    fetchQuestions()
  }, [fetchCategories, fetchQuestions])

  const handleSearch = () => {
    setFilters({ search: searchQuery })
    fetchQuestions()
  }

  const handlePageChange = (page: number) => {
    fetchQuestions(page)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'hard':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Question Bank</h1>
          <p className="text-slate-600 mt-1">
            Browse and practice with our comprehensive collection of AMC questions
          </p>
        </div>
        <Link href="/test">
          <Button className="bg-medical-600 hover:bg-medical-700">
            <BookOpen className="w-4 h-4 mr-2" />
            Start Practice Test
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search questions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex gap-4">
              <Select
                value={filters.category}
                onValueChange={(value) => {
                  setFilters({ category: value === 'all' ? '' : value })
                  fetchQuestions()
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
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

              <Select
                value={filters.difficulty}
                onValueChange={(value) => {
                  setFilters({ difficulty: value === 'all' ? '' : value })
                  fetchQuestions()
                }}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <div className="space-y-4">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))
        ) : questions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600">No questions found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          questions.map((question, index) => (
            <Card key={question._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">
                        Q{(pagination.page - 1) * pagination.limit + index + 1}
                      </Badge>
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                      <Badge variant="outline">{question.category}</Badge>
                    </div>
                    <p className="text-slate-900 font-medium mb-4">
                      {question.questionText}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option: string, optIndex: number) => (
                        <div
                          key={optIndex}
                          className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50"
                        >
                          <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-600">
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span className="text-slate-700">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Bookmark className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-slate-600">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
