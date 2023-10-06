// bookStore.ts

import { create } from "zustand";
import { BookType } from "@/types/Book";
import { fetchBooks } from "@/services/bookService";

type BookState = {
  books: BookType[];
  error: string | null;
  fetch: () => void;
};

export const useBookStore = create<BookState>((set) => ({
  books: [],
  error: null,

  fetch: async () => {
    try {
      const books = await fetchBooks();
      set({ books, error: null });
    } catch (error) {
      set({ error: "Could not fetch the books", books: [] });
    }
  },
}));
