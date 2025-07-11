import React, { useState } from 'react';



function SearchBar() {
    const [searchInput, setSearchInput] = useState('');

    function handleChange(e) {
        setSearchInput(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        alert(`Searching For! ${searchInput}`);
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