'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Bookmark,
} from 'lucide-react'

// Mock question data
const mockQuestions = [
  {
    _id: '1',
    questionText: 'A 45-year-old male presents with chest pain radiating to the left arm. ECG shows ST elevation in leads V1-V4. What is the most likely diagnosis?',
    options: [
      'Acute anterior wall myocardial infarction',
      'Acute pericarditis',
      'Unstable angina',
      'Aortic dissection',
      'Pulmonary embolism',
    ],
    correctAnswer: 0,
    category: 'Cardiology',
    difficulty: 'medium',
  },
  {
    _id: '2',
    questionText: 'A 28-year-old female presents with fatigue, weight gain, and cold intolerance. Lab tests show elevated TSH and low free T4. What is the most appropriate initial treatment?',
    options: [
      'Propylthiouracil',
      'Levothyroxine',
      'Methimazole',
      'Propranolol',
      'Radioactive iodine',
    ],
    correctAnswer: 1,
    category: 'Endocrinology',
    difficulty: 'easy',
  },
  {
    _id: '3',
    questionText: 'A 65-year-old male with a history of COPD presents with worsening dyspnea and productive cough. Chest X-ray shows a new infiltrate. Which organism is most likely responsible?',
    options: [
      'Streptococcus pneumoniae',
      'Mycoplasma pneumoniae',
      'Haemophilus influenzae',
      'Klebsiella pneumoniae',
      'Pseudomonas aeruginosa',
    ],
    correctAnswer: 0,
    category: 'Respiratory',
    difficulty: 'medium',
  },
  {
    _id: '4',
    questionText: 'A 32-year-old female presents with joint pain, rash, and fatigue. ANA is positive at 1:320. What additional test would be most helpful in confirming the diagnosis?',
    options: [
      'Rheumatoid factor',
      'Anti-dsDNA antibodies',
      'Anti-CCP antibodies',
      'HLA-B27',
      'ACE levels',
    ],
    correctAnswer: 1,
    category: 'Rheumatology',
    difficulty: 'hard',
  },
  {
    _id: '5',
    questionText: 'A 50-year-old male presents with hematochezia and a change in bowel habits. Colonoscopy reveals a 4cm mass in the sigmoid colon. What is the next best step?',
    options: [
      'CT scan of chest, abdomen, and pelvis',
      'PET scan',
      'CEA level',
      'Biopsy of the mass',
      'Start chemotherapy',
    ],
    correctAnswer: 3,
    category: 'Gastroenterology',
    difficulty: 'medium',
  },
]

export default function TestSessionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<number>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState(3600) // 60 minutes default
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }))
  }

  const handleFlagQuestion = () => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(currentQuestionIndex)) {
        newSet.delete(currentQuestionIndex)
      } else {
        newSet.add(currentQuestionIndex)
      }
      return newSet
    })
  }

  const handleBookmarkQuestion = () => {
    setBookmarkedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(currentQuestionIndex)) {
        newSet.delete(currentQuestionIndex)
        toast({
          title: 'Bookmark removed',
          description: 'Question removed from bookmarks.',
        })
      } else {
        newSet.add(currentQuestionIndex)
        toast({
          title: 'Question bookmarked',
          description: 'Question saved for later review.',
        })
      }
      return newSet
    })
  }

  const handleSubmitTest = useCallback(async () => {
    if (isSubmitting) return
    
    const unansweredCount = mockQuestions.length - Object.keys(selectedAnswers).length
    
    if (unansweredCount > 0) {
      const confirmed = window.confirm(
        `You have ${unansweredCount} unanswered question(s). Are you sure you want to submit?`
      )
      if (!confirmed) return
    }

    setIsSubmitting(true)
    
    // Calculate score
    let correct = 0
    Object.entries(selectedAnswers).forEach(([qIndex, answer]) => {
      if (mockQuestions[parseInt(qIndex)].correctAnswer === answer) {
        correct++
      }
    })
    
    const score = Math.round((correct / mockQuestions.length) * 100)
    
    toast({
      title: 'Test submitted!',
      description: `Your score: ${score}% (${correct}/${mockQuestions.length} correct)`,
    })
    
    // Navigate to results or dashboard
    router.push('/dashboard')
  }, [isSubmitting, selectedAnswers, router, toast])

  const currentQuestion = mockQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-4">
      {/* Main Question Area */}
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        {/* Timer and Progress Bar */}
        <Card className="shrink-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className={`w-5 h-5 ${timeRemaining < 300 ? 'text-red-500 animate-pulse' : 'text-medical-600'}`} />
                <span className={`font-mono text-lg font-bold ${timeRemaining < 300 ? 'text-red-500' : 'text-slate-900'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">
                  Question {currentQuestionIndex + 1} of {mockQuestions.length}
                </span>
                <Badge variant="outline" className={`
                  ${currentQuestion.difficulty === 'easy' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                  ${currentQuestion.difficulty === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                  ${currentQuestion.difficulty === 'hard' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                `}>
                  {currentQuestion.difficulty}
                </Badge>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div 
                className="bg-medical-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="flex-1 min-h-0 overflow-hidden">
          <ScrollArea className="h-full">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <Badge variant="secondary">{currentQuestion.category}</Badge>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBookmarkQuestion}
                    className={bookmarkedQuestions.has(currentQuestionIndex) ? 'text-medical-600' : ''}
                    aria-label={bookmarkedQuestions.has(currentQuestionIndex) ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    <Bookmark className={`w-5 h-5 ${bookmarkedQuestions.has(currentQuestionIndex) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleFlagQuestion}
                    className={flaggedQuestions.has(currentQuestionIndex) ? 'text-orange-500' : ''}
                    aria-label={flaggedQuestions.has(currentQuestionIndex) ? 'Unflag question' : 'Flag question'}
                  >
                    <Flag className={`w-5 h-5 ${flaggedQuestions.has(currentQuestionIndex) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>

              <h2 className="text-lg font-medium text-slate-900 mb-6 leading-relaxed">
                {currentQuestion.questionText}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`
                      w-full flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all
                      ${selectedAnswers[currentQuestionIndex] === index
                        ? 'border-medical-500 bg-medical-50'
                        : 'border-slate-200 hover:border-medical-300 hover:bg-slate-50'
                      }
                    `}
                    aria-pressed={selectedAnswers[currentQuestionIndex] === index}
                  >
                    <span className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${selectedAnswers[currentQuestionIndex] === index
                        ? 'bg-medical-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 text-slate-700">{option}</span>
                    {selectedAnswers[currentQuestionIndex] === index && (
                      <CheckCircle2 className="w-5 h-5 text-medical-500" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Navigation Buttons */}
        <Card className="shrink-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {flaggedQuestions.has(currentQuestionIndex) && (
                  <Badge variant="outline" className="text-orange-500 border-orange-200 bg-orange-50">
                    <Flag className="w-3 h-3 mr-1" />
                    Flagged
                  </Badge>
                )}
                {selectedAnswers[currentQuestionIndex] !== undefined && (
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Answered
                  </Badge>
                )}
              </div>

              {currentQuestionIndex === mockQuestions.length - 1 ? (
                <Button
                  onClick={handleSubmitTest}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Test'}
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(mockQuestions.length - 1, prev + 1))}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Question Navigation Sidebar */}
      <Card className="lg:w-64 shrink-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Question Navigator</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="grid grid-cols-5 gap-2">
              {mockQuestions.map((_, index) => {
                const isAnswered = selectedAnswers[index] !== undefined
                const isFlagged = flaggedQuestions.has(index)
                const isBookmarked = bookmarkedQuestions.has(index)
                const isCurrent = index === currentQuestionIndex

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`
                      relative w-10 h-10 rounded-lg text-sm font-medium transition-all
                      ${isCurrent
                        ? 'bg-medical-600 text-white ring-2 ring-medical-300'
                        : isAnswered
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }
                    `}
                    aria-label={`Go to question ${index + 1}`}
                    aria-current={isCurrent ? 'true' : undefined}
                  >
                    {index + 1}
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full" />
                    )}
                    {isBookmarked && (
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-medical-500 rounded-full" />
                    )}
                  </button>
                )
              })}
            </div>
          </ScrollArea>

          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded bg-green-100 border border-green-300" />
              <span className="text-slate-600">Answered</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded bg-medical-600" />
              <span className="text-slate-600">Current</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded bg-slate-100 border border-slate-300 relative">
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
              </div>
              <span className="text-slate-600">Flagged</span>
            </div>
          </div>

          <Button
            onClick={handleSubmitTest}
            disabled={isSubmitting}
            className="w-full mt-4 bg-medical-600 hover:bg-medical-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Test'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
