import React from "react";

 const SearchBar= ()=> {
  return (
<div className="search">
    <nav className=" navbar ">
      <div className="container justify-content-center">
        <form className="d-flex w-50" role="search">
          <input
            type="text"
            className="form-control me-4"
            placeholder="Search"
            aria-label="Search"
          />
          <select id="categorySelect" className="form-select me-2">
            <option value="">All</option>
          </select>

          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  </div>
)
};

export default SearchBar;

