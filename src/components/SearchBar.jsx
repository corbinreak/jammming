import React, { useState } from 'react';


function SearchBar({ onSearch }) {
    const [searchInput, setSearchInput] = useState('');

    function handleChange(e) {
        setSearchInput(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (onSearch) {
        onSearch(searchInput);
        alert(`Searching For! ${searchInput}`);
    } else {
        console.warn("No onSearch prop provided to SearchBar");

     }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Search Songs Here!" 
            value={searchInput}
            onChange={handleChange}
            />
            <button>Search!</button>
        </form>
    ) 
  }


  export default SearchBar;