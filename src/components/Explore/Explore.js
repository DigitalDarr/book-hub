import React, { useEffect, useCallback } from "react";
import Navbar from "../NavBar/NavBar";
import BookList from "../BookList/BookList";
import { useGlobalContext } from "../../context";
import "./Explore.css";

const Explore = () => {
  const genres = [
    "Fantasy", "Fiction", "Science Fiction", "Romance", "Mystery", "Horror",
    "Thriller", "Nonfiction", "Poetry", "Humor", "Literature", "Picture", "Manga", "Cooking",
    "Magic", "Biology", "Mathematics", "Physics", "Programming", "Finance",
    "Self-Help", "Autobiographies", "Psychology", "Anthropology"
  ];

  // Access the global context
  const { selectedGenre, setSelectedGenre, books, loading, resultTitle, setResultTitle, setBooks } = useGlobalContext();

  // Fetch books based on the selected genre
  const fetchBooksByGenre = useCallback(async () => {
    if (!selectedGenre) return;

    setResultTitle(`Top ${selectedGenre} Books`);
    
    const formattedGenre = selectedGenre.toLowerCase().replace(/\s+/g, "-");
    const url = `https://openlibrary.org/subjects/${formattedGenre}.json`;

    try {
      console.log("Fetching from URL:", url);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      console.log("API Response:", data);

      if (data?.works?.length > 0) {
        setBooks(
          data.works.map((book) => ({
            id: book.key,
            title: book.title,
            genre: book.subject,
            author: book.authors?.map((author) => author.name) || ["Unknown Author"],
            cover_id: book.cover_id,
            edition_count: book.edition_count,
            first_publish_year: book.first_publish_year,
          }))
        );
      } else {
        setBooks([]);
        setResultTitle("No Results Found");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
      setResultTitle("Error Loading Books");
    }
  }, [selectedGenre, setBooks, setResultTitle]);

  // Fetch books whenever selectedGenre changes
  useEffect(() => {
    fetchBooksByGenre();
  }, [fetchBooksByGenre]); 

  return (
    <div>
      <Navbar />
      <section className="explore">
        <div className="genre-selector">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`genre-button ${selectedGenre === genre ? "active" : ""}`}
              onClick={() => {
                setSelectedGenre(genre); 
                console.log(`Selected genre: ${genre}`); 
              }}
            >
              {genre}
            </button>
          ))}
        </div>

        <BookList books={books} loading={loading} resultTitle={resultTitle} />
      </section>
    </div>
  );
};

export default Explore;


