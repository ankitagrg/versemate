export interface Book {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      publishedDate?: string;
      description?: string;
      imageLinks?: {
        thumbnail: string;
      };
      categories?: string[];
    };
  }
  
  export interface BookState {
    readList: Book[];
    readBooks: Book[];
  }