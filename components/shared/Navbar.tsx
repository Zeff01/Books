"use client";

import React, { useState } from "react";
import { FaPlus, FaPencilAlt } from "react-icons/fa"; // Import FaPencil
import { BsBook } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BookForm from "../forms/BookForm";
import Link from "next/link";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div className="w-full bg-primaryColor h-20 flex justify-between items-center px-4">
      <Link
        href="/"
        className="hover:text-quarternaryColor flex items-center gap-1"
      >
        <BsBook size={50} />
        <span className="font-bold text-4xl">Books</span>
      </Link>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <FaPlus
            className="cursor-pointer hover:text-quarternaryColor "
            size={36}
            onClick={openDialog}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Published a Book</DialogTitle>
            <DialogDescription>
              Enter the details of the book you'd like to add to the collection.
            </DialogDescription>
          </DialogHeader>
          <BookForm closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
