import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import ReadingListPage from './pages/ReadingListPage';
import CompletedPage from './pages/CompletedPage';
import Footer from './components/Footer'; 

function App() {
  return (
    <Router>
      <BookProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/reading-list" element={<ReadingListPage />} />
              <Route path="/completed" element={<CompletedPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BookProvider>
    </Router>
  );
}

export default App;
