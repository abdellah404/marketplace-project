import React from "react";

const SearchBar = () => {
  return (
    <div className="search">
      <nav className="navbar">
        <div className="container justify-content-center">
          <form className="d-flex w-50" role="search">
            <input
              type="text"
              className="form-control me-4 rounded-1 shadow-none border border-secondary"
              placeholder="Search"
              aria-label="Search"
            />
            <select
              id="categorySelect"
              className="form-select me-2 rounded-1 shadow-none border border-secondary"
            >
              <option value="">All</option>
            </select>

            <button className="btn btn-primary rounded-1" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default SearchBar;