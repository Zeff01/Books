import { supabase } from "@/lib/initSupabase";
import { BookType } from "@/types/Book";

export const fetchBooks = async (): Promise<BookType[]> => {
  const { data, error } = await supabase.from("Books").select();

  if (error) {
    throw error;
  }

  if (data) {
    return data as BookType[];
  }

  throw new Error("Unknown error fetching books");
};
