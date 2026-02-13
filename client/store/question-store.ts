import { create } from "zustand";
import { api } from "@/lib/api";

interface Category {
  name: string;
  subcategories: string[];
  questionCount: number;
}

interface Question {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  subcategory?: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}

interface Filters {
  category: string;
  difficulty: string;
  search: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface QuestionState {
  questions: Question[];
  categories: Category[];
  pagination: Pagination;
  filters: Filters;
  isLoading: boolean;
  fetchQuestions: (page?: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setFilters: (filters: Partial<Filters>) => void;
}

export const useQuestionStore = create<QuestionState>((set, get) => ({
  questions: [],
  categories: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  },
  filters: {
    category: "",
    difficulty: "",
    search: "",
  },
  isLoading: false,

  fetchQuestions: async (page = 1) => {
    set({ isLoading: true });
    try {
      const { filters } = get();
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        ...(filters.category && { category: filters.category }),
        ...(filters.difficulty && { difficulty: filters.difficulty }),
        ...(filters.search && { search: filters.search }),
      });

      const response: any = await api.get(`/questions?${queryParams}`);
      const data = response?.data || response;
      set({
        questions: data?.questions || [],
        pagination: data?.pagination || { page: 1, limit: 20, total: 0, pages: 0 },
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchCategories: async () => {
    try {
      const response: any = await api.get("/questions/subjects");
      set({ categories: response.data || [] });
    } catch (error) {
      set({ categories: [] });
      throw error;
    }
  },

  setFilters: (filters: Partial<Filters>) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
      pagination: { ...state.pagination, page: 1 },
    }));
  },
}));
