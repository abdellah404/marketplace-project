import React from "react";


export default function SearchBar() {
  return (
<div className="search">
    <nav class=" navbar ">
      <div class="container justify-content-center">
        <form class="d-flex w-50" role="search">
          <input
            type="text"
            class="form-control me-4"
            placeholder="Search"
            aria-label="Search"
          />

          <select id="categorySelect" className="form-select me-2">
            <option value="">All</option>
          </select>

          <button class="btn btn-outline-primary" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  </div>
)
};

