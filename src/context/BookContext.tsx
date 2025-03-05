import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Book, BookState } from "../types";

type BookAction =
  | { type: 'ADD_TO_READ_LIST'; payload: Book }
  | { type: 'MARK_AS_READ'; payload: Book }
  | { type: 'REMOVE_FROM_READ_LIST'; payload: string };

const initialState: BookState = {
  readList: [],
  readBooks: []
};

const loadState = (): BookState => {
  try {
    const state = localStorage.getItem('bookState');
    return state ? JSON.parse(state) : initialState;
  } catch {
    return initialState;
  }
};

const BookContext = createContext<{
  state: BookState;
  addToReadList: (book: Book) => void;
  markAsRead: (book: Book) => void;
  removeFromReadList: (bookId: string) => void;
} | null>(null);

const bookReducer = (state: BookState, action: BookAction): BookState => {
  switch (action.type) {
    case 'ADD_TO_READ_LIST':
      return {
        ...state,
        readList: [...state.readList, action.payload]
      };
    case 'MARK_AS_READ':
      return {
        readList: state.readList.filter(book => book.id !== action.payload.id),
        readBooks: [...state.readBooks, action.payload]
      };
    case 'REMOVE_FROM_READ_LIST':
      return {
        ...state,
        readList: state.readList.filter(book => book.id !== action.payload)
      };
    default:
      return state;
  }
};

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, loadState());

  useEffect(() => {
    localStorage.setItem('bookState', JSON.stringify(state));
  }, [state]);

  const addToReadList = (book: Book) => {
    dispatch({ type: 'ADD_TO_READ_LIST', payload: book });
  };

  const markAsRead = (book: Book) => {
    dispatch({ type: 'MARK_AS_READ', payload: book });
  };

  const removeFromReadList = (bookId: string) => {
    dispatch({ type: 'REMOVE_FROM_READ_LIST', payload: bookId });
  };

  return (
    <BookContext.Provider value={{ state, addToReadList, markAsRead, removeFromReadList }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};