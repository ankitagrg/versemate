import React from 'react';
import { useBooks } from '../context/BookContext';
import BookCard from "../components/BookCard";

const ReadingListPage = () => {
  const { state } = useBooks();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Reading List</h1>
      
      {state.readList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Your reading list is empty. Start adding books from the search page!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {state.readList.map((book) => (
            <BookCard key={book.id} book={book} variant="reading" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingListPage;