import React from 'react';
import SearchBar from './SearchBar';

function SearchResults({ songs = [], onAdd }) {
   

    return (
        <div>
           <h2>Search Results:</h2>
           <ul>
            {songs.length > 0 ? (
            songs.map(song => (
                <li key={song.id}>
                    {song.name} by {song.artist} - {song.album}
                    <button onClick={() => onAdd(song)}>Add</button>
                </li>
            ))
        ) : (
            <p>No matching songs found.</p>
           )}
           </ul>
            
        </div>
    )
  }

  export default SearchResults;