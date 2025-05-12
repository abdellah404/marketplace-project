import React, { useState } from "react";
import { useNavigate } from "react-router";
import useTheme from "../../hooks/useTheme";
import useAnnonces from "../../hooks/useAnnonces";
import useCategories from "../../hooks/useCategories";
import "./SearchBar.css"; 

const SearchBar = () => {
  const { isDarkMode } = useTheme();
  const { categoriesData } = useCategories();
  const { annoncesData } = useAnnonces();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();  
    // Redirect to SearchResult page with query parameters
    navigate(
      `/app/searchresult?query=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(category)}`
    );
  };

  return (
    <div
      className={`search ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{
        padding: "10px 0",
        backgroundColor: isDarkMode ? "#333333" : "#f8f9fa",
      }}
    >
      <nav
        className="navbar"
        style={{
          boxShadow: isDarkMode
            ? "0 2px 5px rgba(255, 255, 255, 0.1)"
            : "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container justify-content-center mt-2">
          <form className="d-flex w-50 mb-3" role="search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className={`form-control me-4 rounded-pill shadow-none border-2 ${
                isDarkMode ? "bg-dark text-light border-light" : "bg-light text-dark border-secondary"
              }`}
              placeholder="Search here"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              id="categorySelect"
              className={`form-select me-2 rounded-pill shadow-none border-2 ${
                isDarkMode ? "bg-dark text-light border-light" : "bg-light text-dark border-secondary"
              }`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              {categoriesData &&
                categoriesData.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>

            <button
              className={`btn rounded-pill ${isDarkMode ? "btn-dark-purple" : "btn-primary"}`}
              style={{
                backgroundColor: isDarkMode ? "#6a0dad" : "black",
                color: "#ffffff",
              }}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default SearchBar;