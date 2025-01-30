import React, { useRef, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import "./SearchForm.css";

const SearchForm = () => {
  const { setSearchTerm, setSearchBy, setResultTitle, books, setBooks } =
    useGlobalContext(); // Accessing setBooks and books from context
  const searchText = useRef("");
  const [searchType, setSearchType] = useState("title"); // Default to "title"
  const [sortBy, setSortBy] = useState(""); // Sort option
  const navigate = useNavigate();


  useEffect(() => {
    searchText.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempSearchTerm = searchText.current.value.trim();

    if (tempSearchTerm.replace(/[^\w\s]/gi, "").length === 0) {
      setResultTitle("Please Enter Something ...");
    } else {
      setSearchBy(searchType);
      setSearchTerm(tempSearchTerm);
    }

    navigate("/book");
  };

  const handleTypeChange = (type) => {
    setSearchType(type);
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);

    // Sorting logic
    let sortedBooks = [];
    if (selectedSort === "alphabet_asc") {
      sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === "alphabet_desc") {
      sortedBooks = [...books].sort((a, b) => b.title.localeCompare(a.title));
    } else if (selectedSort === "year_asc") {
      sortedBooks = [...books].sort(
        (a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0)
      );
    } else if (selectedSort === "year_desc") {
      sortedBooks = [...books].sort(
        (a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0)
      );
    }
    setBooks(sortedBooks); 
  };


  return (
    <div className="search-form">
      <div className="container">
        <div className="search-form-content">

        

          <div className="search-type-selector"> 
            <span
              className={`search-type ${
                searchType === "title" ? "active" : ""
              }`}
              onClick={() => handleTypeChange("title")}
            >
              Title
            </span>
            <span
              className={`search-type ${
                searchType === "author" ? "active" : ""
              }`}
              onClick={() => handleTypeChange("author")}
            >
              Author
            </span>
          </div>

 
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form-elem flex flex-sb bg-white">
              <input
                type="text"
                className="form-control"
                placeholder={`Search by ${searchType}...`}
                ref={searchText}
              />
              <button type="submit" className="flex flex-c">
                <FaSearch className="text-purple" size={32} />
              </button>
            </div>
          </form>


          <div className="sort-by-selector">
            <label htmlFor="sortBy">Sort by:</label>
            <select id="sortBy" value={sortBy} onChange={handleSortChange}>
              <option value="">None</option>
              <option value="alphabet_asc">A-Z</option>
              <option value="alphabet_desc">Z-A</option>
              <option value="year_asc">Oldest</option>
              <option value="year_desc">Newest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;

