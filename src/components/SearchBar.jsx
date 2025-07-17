import React, { useState } from 'react';
import './SearchBar.css'


function SearchBar({ onSearch }) {
    const [searchInput, setSearchInput] = useState('');

    function handleChange(e) {
        setSearchInput(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (onSearch) {
        onSearch(searchInput);
        console.log(`Searching For! ${searchInput}`);
    } else {
        console.warn("No onSearch prop provided to SearchBar");

     }
    }

    const searchButtonStyle = {
        backgroundColor: '#ff4c4c',
        color: 'white',
        borderRadius: '0 6px 6px 0',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',

    }

 
    return (
        <form onSubmit={handleSubmit}
         style={{
             display: 'flex',
             justifyContent: 'center',
             gap: '1rem',
             marginTop: '1rem',
             width: '100%',

          }}
        >
          <div style={{ display: 'flex', width: '90%' }}>
            <input 
            type="text" 
            placeholder="Search Songs Here!" 
            value={searchInput}
            onChange={handleChange}
            className="search-input"
            />
            <button style={searchButtonStyle}>Search!</button>
          </div>
        </form>
    ) 
  }


  export default SearchBar;