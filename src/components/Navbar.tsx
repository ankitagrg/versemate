import React from 'react';
import { Library, BookOpen, Search, BookMarked } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

            
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              {/* Icon next to text */}
              <img 
                src="./src/assets/open-book.png" 
                alt="Open Book Icon" 
                className="h-6 w-6"/>
              <span className="text-xl font-bold text-black-800">VerseMate</span>
            </Link>
            
          </div>
          {/* Navigation Links */}
          <div className="flex space-x-8">
            {/* Search Link */}
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                ${isActive('/')
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-black-800 hover:text-indigo-600 hover:shadow-sm hover:border-b-2 hover:border-indigo-600 focus:ring-2 focus:ring-indigo-600'}`}
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </Link>

              
              <link rel="stylesheet" href="assets/open-book.png" />

           
           
           
           
            {/* Reading List Link */}
            <Link
              to="/reading-list"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                ${isActive('/reading-list')
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-black-800 hover:text-indigo-600 hover:shadow-sm hover:border-b-2 hover:border-indigo-600 focus:ring-2 focus:ring-indigo-600'}`}
            >
              <BookMarked className="h-5 w-5" />
              <span>Reading List</span>
            </Link>
            <link rel="stylesheet" href="assets/open-book.png" />
            
            {/* Completed Link */}
            <Link
              to="/completed"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                ${isActive('/completed')
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-black-800 hover:text-indigo-600 hover:shadow-sm hover:border-b-2 hover:border-indigo-600 focus:ring-2 focus:ring-indigo-600'}`}
            >
              <BookOpen className="h-5 w-5" />
              <span>Completed</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
