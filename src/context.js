import React, { useState, useContext, useCallback, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title"); 
  const [selectedGenre, setSelectedGenre] = useState("Fantasy"); 
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");

  const fetchBooks = useCallback(async () => {
    setLoading(true);

    // New BASE_URLS object with genre handling
    const BASE_URLS = {
      title: "https://openlibrary.org/search.json?title=",
      author: "https://openlibrary.org/search.json?author=",
      genre: `https://openlibrary.org/subjects/${selectedGenre}.json`, // Genre-specific URL
    };

    let url;
    if (searchBy === "genre" && selectedGenre) {
      // When searching by genre, use the genre-specific URL
      url = BASE_URLS[searchBy];
    } else {
      // Fallback to title or author-based searches
      url = `${BASE_URLS[searchBy]}${searchTerm}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      const { docs } = data;

      if (docs) {
        const newBooks = docs.slice(0, 60).map((book) => {
          const {
            key,
            author_name,
            cover_i,
            edition_count,
            first_publish_year,
            title,
          } = book;

          return {
            id: key,
            author: author_name,
            cover_id: cover_i,
            edition_count: edition_count,
            first_publish_year,
            title,
          };
        });

        setBooks(newBooks);
        setResultTitle(newBooks.length > 0 ? "Your Search Result" : "No Results Found");
      } else {
        setBooks([]);
        setResultTitle("No Results Found");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, searchBy, selectedGenre]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, searchBy, selectedGenre, fetchBooks]);

  const sortBooks = (books, sortBy) => {
    if (sortBy === "alphabet_asc") {
      return [...books].sort((a, b) => a.title.localeCompare(b.title)); // A-Z
    }
    if (sortBy === "alphabet_desc") {
      return [...books].sort((a, b) => b.title.localeCompare(a.title)); // Z-A
    }
    if (sortBy === "year_asc") {
      return [...books].sort(
        (a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0) // Oldest to Newest
      );
    }
    if (sortBy === "year_desc") {
      return [...books].sort(
        (a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0) // Newest to Oldest
      );
    }
    return books; 
  };

  return (            
    <AppContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchBy, 
        setSearchBy, 
        selectedGenre,  
        setSelectedGenre,  
        books,
        setBooks, 
        sortBooks,
        loading,
        resultTitle,
        setResultTitle,
      }}
    >
      {children}
    </AppContext.Provider>


  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
