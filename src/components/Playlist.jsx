import React, { useState } from 'react';

  function Playlist({ PlaylistName, tracks, onRemove, onNameChange }) {
    

    return (
        <div>
           <input 
             type="text"
             value={PlaylistName}
             onChange={(e) => onNameChange(e.target.value)}
           />
           <ul>
             {tracks.map(track => (
                <li key={track.id}>
                    <div>
                        <strong>{track.name}</strong> by {track.artist} - {track.album}
                        <button onClick={() => onRemove(track.id)}>Remove</button>
                    </div>
                    
                </li>
             ))}
           </ul>
           <div className="spotify-bttn">
                      <button style={{ backgroundColor: 'green', color: 'white', borderRadius: '8px', fontSize: '1.5rem' }}>Add To Spotify!</button>

           </div>
        </div>
    )
  }


  export default Playlist;