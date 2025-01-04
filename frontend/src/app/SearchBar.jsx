"use client";

import React from "react";

/**
 * Renders the search bar input.
 * 
 * @param {boolean} showSearchBar - Whether to show or hide the search bar.
 * @param {string} searchTerm - Current search input value.
 * @param {function} setSearchTerm - State setter for the search term.
 * @param {function} handleSearch - Function to call when user submits.
 */
const SearchBar = ({ showSearchBar, searchTerm, setSearchTerm, handleSearch }) => {
  if (!showSearchBar) return null;

  return (
    <div className="mt-8 w-full max-w-md z-10 ">
      <div className="relative">
        <input
          type="text"
          placeholder='"I miss my ex..."'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="w-full py-3 pl-4 pr-10 text-white bg-gray-800/50 rounded-full 
                    animate-fade-in-search focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
          onClick={handleSearch}
        >
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
