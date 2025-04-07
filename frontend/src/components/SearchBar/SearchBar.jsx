import React from "react";
import useTheme from "../../hooks/useTheme";
import "./SearchBar.css"; 

const SearchBar = () => {
  const { isDarkMode } = useTheme(); // Access the isDarkMode state

  return (
    <div
      className={`search ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`} // Dynamic background and text color
      style={{
        padding: "10px 0",
        
        backgroundColor: isDarkMode ? "#333333" : "#f8f9fa", // Adjust background color for dark and light modes
      }}
    >
      <nav
         className="navbar"
         style={{
           boxShadow: isDarkMode
             ? "0 2px 5px rgba(255, 255, 255, 0.1)" // Lighter shadow for dark mode
             : "0 2px 5px rgba(0, 0, 0, 0.1)", // Darker shadow for light mode
           
         }}>
          
        <div  className="container justify-content-center mt-2">
          <form className="d-flex w-50 mb-3" role="search">
            <input
              type="text"
              className={`form-control me-4 rounded-pill shadow-none border-2 ${
                isDarkMode ? "bg-dark text-light border-light" : "bg-light text-dark border-secondary"
              }`}
              placeholder="Search here" 
              aria-label="Search"
            />
            <select
              id="categorySelect"
              className={`form-select me-2 rounded-pill shadow-none border-2 ${
                isDarkMode ? "bg-dark text-light border-light" : "bg-light text-dark border-secondary"
              }`} 
            >
              <option value="">All</option>
            </select>

            <button
              className={`btn rounded-pill ${
                isDarkMode ? "btn-dark-purple" : "btn-primary"
              }`}
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