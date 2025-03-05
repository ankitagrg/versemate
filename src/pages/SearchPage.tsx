import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Book } from "../types";
import BookCard from '../components/BookCard';

const GENRES = [
  {
    name: 'Fiction',
    image: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&q=80&w=800',
    description: 'Explore imaginative stories and narratives'
  },
  {
    name: 'Mystery',
    image: 'https://images.unsplash.com/photo-1587876931567-564ce588bfbd?auto=format&fit=crop&q=80&w=800',
    description: 'Uncover thrilling mysteries and suspense'
  },
  {
    name: 'Science Fiction',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    description: 'Journey through space and future worlds'
  },
  {
    name: 'Romance',
    image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&q=80&w=800',
    description: 'Experience love stories and relationships'
  },
  {
    name: 'Fantasy',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80&w=800',
    description: 'Discover magical realms and epic adventures'
  },

  {
    name: 'Self-Help',
    image: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&q=80&w=800',
    description: 'Discover books that inspire growth and success'
  },
  {
    name: 'Poetry',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    description: 'Enjoy the beauty of words and artistic expression'
  },
  {
    name: 'Biography',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    description: 'Read inspiring life stories'
  },
  
  
];

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  
  const searchBooks = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=20`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchBooks(query);
    }
  };

  const handleGenreClick = (genre: string) => {
    setQuery(genre);
    searchBooks(genre);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="text-center mb-12">
  <h1 className="text-3xl font-bold text-gray-900 mb-4">
    Welcome to VerseMate
  </h1>
  <p className="text-l max-w-1l mx-auto">
    <span className="text-black-700">Your gateway to endless stories.</span>
    <br />
    <span className="text-black-700">Discover new worlds,learn from experts and build your perfect reading list.</span> <br />

  </p>
</div>


      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-12">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </form>

      {/* Genre Showcase */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Explore Popular Genres
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {GENRES.map((genre) => (
            <button
              key={genre.name}
              onClick={() => handleGenreClick(genre.name)}
              className="group relative overflow-hidden rounded-xl aspect-[3/2] shadow-lg transition-transform hover:scale-[1.02]"
            >
              <img
                src={genre.image}
                alt={genre.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{genre.name}</h3>
                  <p className="text-sm text-gray-200">{genre.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {(loading || books.length > 0) && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Search Results</h2>
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;