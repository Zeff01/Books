'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/initSupabase';
import BookCard from '@/components/cards/BookCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import BookForm from '@/components/forms/BookForm';
import { Toaster } from '@/components/ui/toaster';

const Book = () => {
  const [book, setBook] = useState(undefined);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const openEditDialog = () => setIsEditDialogOpen(true);
  const closeEditDialog = () => setIsEditDialogOpen(false);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const fetchBook = async () => {
    const { data, error } = await supabase
      .from('Books')
      .select()
      .eq('id', id)
      .single();

    if (data) {
      setBook(data);
    }
    if (error) {
      router.back();
    }
  };

  useEffect(() => {
    fetchBook();
  }, [isEditDialogOpen]);

  if (!id) {
    router.back();
  }

  if (book === undefined) {
    return <div>Loading...</div>;
  }

  if (book === null) {
    return <div>Book not found</div>;
  }

  return (
    <div className="mx-auto p-4 border-2 flex-col flex  items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-20">
        You Could Edit the Book here by clicking the Pen Icon
      </h1>
      <BookCard book={book} isEdit={true} onEditClick={openEditDialog} />

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTrigger asChild>
          <div></div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Update the details of the selected book.
            </DialogDescription>
          </DialogHeader>
          <BookForm
            closeDialog={closeEditDialog}
            mode="edit"
            initialValues={book}
          />
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
};

export default Book;
