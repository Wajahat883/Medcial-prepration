import { create } from 'zustand';
import { api } from '@/lib/api';

interface Bookmark {
  _id: string;
  question: any;
  notes: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface BookmarkState {
  bookmarks: Bookmark[];
  pagination: Pagination;
  isLoading: boolean;
  fetchBookmarks: (page?: number) => Promise<void>;
  addBookmark: (questionId: string, notes?: string) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
  updateNotes: (id: string, notes: string) => Promise<void>;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  },
  isLoading: false,

  fetchBookmarks: async (page = 1) => {
    set({ isLoading: true });
    try {
      const response: any = await api.get(`/bookmarks?page=${page}&limit=20`);
      set({ 
        bookmarks: response.bookmarks || [], 
        pagination: response.pagination || { page: 1, limit: 20, total: 0, pages: 0 },
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addBookmark: async (questionId: string, notes = '') => {
    try {
      await api.post('/bookmarks', { questionId, notes });
    } catch (error) {
      throw error;
    }
  },

  removeBookmark: async (id: string) => {
    try {
      await api.delete(`/bookmarks/${id}`);
      set((state) => ({
        bookmarks: state.bookmarks.filter((b) => b._id !== id),
      }));
    } catch (error) {
      throw error;
    }
  },

  updateNotes: async (id: string, notes: string) => {
    try {
      await api.put(`/bookmarks/${id}/notes`, { notes });
      set((state) => ({
        bookmarks: state.bookmarks.map((b) =>
          b._id === id ? { ...b, notes } : b
        ),
      }));
    } catch (error) {
      throw error;
    }
  },
}));
