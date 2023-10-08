'use client';
import React, { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import BookCard from '@/components/cards/BookCard';
import { useBookStore } from '@/store/bookStore';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/initSupabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMutation } from 'react-query';

export default function Home() {
  const { books, error, fetch } = useBookStore();

  useEffect(() => {
    fetch();
  }, []);

  async function deleteBook(id: number) {
    const { error } = await supabase.from('Books').delete().eq('id', id);
    if (error) throw error;
  }

  const deleteMutation = useMutation(deleteBook, {
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Book deleted successfully.',
        duration: 1000
      });
      fetch();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Error deleting book.',
        duration: 1000
      });
    }
  });

  const handleDelete = (id: number): void => {
    if (!confirm('Are you sure you want to delete this book?')) {
      return;
    }
    deleteMutation.mutate(id);
  };

  return (
    <main className="flex  p-8 ">
      <Tabs defaultValue="books">
        <TabsList>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="deleted">Deleted</TabsTrigger>
        </TabsList>
        <TabsContent value="books">
          <div className="flex w-full ">
            {books.length <= 0 && (
              <p className="text-4xl font-bold">
                No books yet, try adding some..
              </p>
            )}
            {error && <p>{error}</p>}
            {books && (
              <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4">
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    isEdit={false}
                    onDelete={() => handleDelete(book.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-4xl font-bold ">
            No books are added on favorite list yet
          </p>
        </TabsContent>
        <TabsContent value="deleted">
          <p className="text-4xl font-bold ">No books are deleted yet</p>
        </TabsContent>
      </Tabs>

      <Toaster />
    </main>
  );
}
