// src/components/SearchBar.js
import React from "react";

function SearchBar({ searchTerm, setSearchTerm}) {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;