import React from 'react';
import { BookType } from '@/types/Book';
import { Badge } from '@/components/ui/badge';
import { AiFillStar } from 'react-icons/ai';
import { BiLinkExternal, BiPencil, BiTrash } from 'react-icons/bi';
import { capitalizeFirstLetter, formatDate } from '@/utils/stringHelpers';
import Link from 'next/link';

type BookCardProps = {
  book: BookType;
  isEdit: boolean;
  onEditClick?: () => void;
  onDelete?: () => void;
};

const BookCard: React.FC<BookCardProps> = ({
  book,
  isEdit,
  onEditClick,
  onDelete
}) => {
  return (
    <div className="bg-black text-tertiaryColor border-l-[20px] rounded-xl border-primaryColor p-4 shadow-2xl w-64 h-96 ">
      <div className="flex-col justify-between h-full flex">
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <h3 className="text-2xl ">{book.title}</h3>
            <span className="text-xs text-white">{book.author}</span>
          </div>
          <div className="flex gap-1">
            {isEdit ? (
              <BiPencil
                size={30}
                className="hover:text-secondaryColor cursor-pointer"
                onClick={onEditClick}
              />
            ) : (
              <Link href={`/book/${book.id}`}>
                <BiLinkExternal
                  size={24}
                  className="hover:text-secondaryColor"
                />
              </Link>
            )}
            {!isEdit && (
              <BiTrash
                size={24}
                className="hover:text-red-500 cursor-pointer"
                onClick={onDelete}
              />
            )}
          </div>
        </div>

        <div>
          <div className="flex space-x-1 my-2">
            {[...Array(book.rating)].map((_, index) => (
              <AiFillStar key={index} size={22} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1 text-xs">
            {book.genre.map((genre, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-2 text-center cursor-pointer"
              >
                {capitalizeFirstLetter(genre)}
              </Badge>
            ))}
          </div>
          <span className="text-xs text-white mt-1">
            Published: {formatDate(book.publishedDate)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
