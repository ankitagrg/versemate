import React from 'react';
import { Check, Plus, X } from "lucide-react";
import { Book } from "../types";
import { useBooks } from "../context/BookContext";

interface BookCardProps {
  book: Book;
  variant?: 'search' | 'reading' | 'completed';
}

const BookCard: React.FC<BookCardProps> = ({ book, variant = 'search' }) => {
  const { addToReadList, markAsRead, removeFromReadList, state } = useBooks();
  
  const isInReadList = state.readList.some(b => b.id === book.id);
  const isCompleted = state.readBooks.some(b => b.id === book.id);
  
  const defaultImage = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
      <div className="relative aspect-[2/3]">
        <img
          src={book.volumeInfo.imageLinks?.thumbnail || defaultImage}
          alt={book.volumeInfo.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {variant === 'search' && !isInReadList && !isCompleted && (
          <button
            onClick={() => addToReadList(book)}
            className="absolute bottom-4 right-4 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
          </button>
        )}
      
        
        {variant === 'reading' && (
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={() => markAsRead(book)}
              className="p-2 bg-green-600 rounded-full text-white hover:bg-green-700"
            >
              <Check className="h-5 w-5" />
            </button>
            <button
              onClick={() => removeFromReadList(book.id)}
              className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        
        {variant === 'completed' && (
          <div className="absolute top-4 right-4">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
              Completed
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-1">{book.volumeInfo.title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
        </p>
        {book.volumeInfo.categories && (
          <p className="text-xs text-indigo-600 mt-2">
            {book.volumeInfo.categories[0]}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookCard;