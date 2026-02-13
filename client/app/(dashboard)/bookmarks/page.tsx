'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Bookmark, 
  Trash2, 
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useBookmarkStore } from '@/store/bookmark-store'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'

export default function BookmarksPage() {
  const { toast } = useToast()
  const { 
    bookmarks, 
    pagination, 
    isLoading, 
    fetchBookmarks, 
    removeBookmark,
    updateNotes 
  } = useBookmarkStore()

  useEffect(() => {
    fetchBookmarks()
  }, [fetchBookmarks])

  const handleRemoveBookmark = async (id: string) => {
    try {
      await removeBookmark(id)
      toast({
        title: 'Bookmark removed',
        description: 'Question removed from your bookmarks.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove bookmark.',
        variant: 'destructive',
      })
    }
  }

  const handleUpdateNotes = async (id: string, notes: string) => {
    try {
      await updateNotes(id, notes)
      toast({
        title: 'Notes updated',
        description: 'Your notes have been saved.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update notes.',
        variant: 'destructive',
      })
    }
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
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Bookmarks</h1>
        <p className="text-slate-600 mt-1">
          Questions you&apos;ve saved for later review
        </p>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))
        ) : bookmarks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-2">No bookmarks yet</p>
              <p className="text-sm text-slate-500">
                Save questions while practicing to review them later
              </p>
            </CardContent>
          </Card>
        ) : (
          bookmarks.map((bookmark) => (
            <Card key={bookmark._id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getDifficultyColor(bookmark.question.difficulty)}>
                        {bookmark.question.difficulty}
                      </Badge>
                      <Badge variant="outline">{bookmark.question.category}</Badge>
                      <span className="text-sm text-slate-500">
                        Bookmarked on {new Date(bookmark.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-slate-900 font-medium mb-4">
                      {bookmark.question.questionText}
                    </p>

                    {/* Options */}
                    <div className="space-y-2 mb-4">
                      {bookmark.question.options.map((option: string, index: number) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${
                            index === bookmark.question.correctAnswer
                              ? 'bg-green-50 border-green-300'
                              : 'border-slate-200'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                            index === bookmark.question.correctAnswer
                              ? 'bg-green-500 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-slate-700">{option}</span>
                          {index === bookmark.question.correctAnswer && (
                            <Badge className="ml-auto bg-green-100 text-green-700">
                              Correct
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Explanation */}
                    <div className="bg-medical-50 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-medical-900 mb-1">Explanation</p>
                      <p className="text-sm text-slate-700">{bookmark.question.explanation}</p>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Your Notes</label>
                      <Textarea
                        placeholder="Add notes about this question..."
                        defaultValue={bookmark.notes}
                        onBlur={(e) => handleUpdateNotes(bookmark._id, e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleRemoveBookmark(bookmark._id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {!isLoading && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchBookmarks(pagination.page - 1)}
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
            onClick={() => fetchBookmarks(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
