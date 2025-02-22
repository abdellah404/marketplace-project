import React, { useEffect, useState } from "react";


function SearchPage() {
 


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="filter-section mb-3 p-3 border rounded">
            <h5>Filters</h5>
            <div className="d-flex flex-column">
              {/* Task 3: Dynamically generate category and condition dropdown options.*/}
              <div className="mb-2">
                <label htmlFor="categorySelect" className="form-label">
                  Category
                </label>
                <select id="categorySelect" className="form-select">
                    <option value="">All</option>
                  
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="conditionSelect" className="form-label">
                  Condition
                </label>
                <select id="conditionSelect" className="form-select">
                <option value="">All</option>
                  
                </select>
              </div>
              
              
            </div>
          </div>

        
        {/* Task 7: Add text input field for search criteria*/}
          <input
            type="text"
            className="mb-3 form-control"
            placeholder="Search for posts"
            
          />
          {/* Task 8: Implement search button with onClick event to trigger search:*/}
            <button className="btn btn-primary" >
                Search
            </button>

          {/* Task 5: Display search results and handle empty results with a message. */}
          <div className="search-results mt-4">
            
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
