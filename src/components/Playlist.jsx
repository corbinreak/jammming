import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';



  function Playlist({ PlaylistName, tracks, onRemove, onNameChange }) {

    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(PlaylistName);

    useEffect(() => {
      setTempTitle(PlaylistName);
    }, [PlaylistName]);


      const handleEditClick = () => {
        setIsEditing(true);
      };

      const handleSaveClick= () => {
        onNameChange(tempTitle);
        setIsEditing(false);
      }

      const handleChange = (e) => {
        setTempTitle(e.target.value);
      }
    

    return (
        <div>
          {isEditing ? ( 
           <>
           <input 
             type="text"
             value={tempTitle ?? ''}
             onChange={handleChange}
             style={{ fontSize: '1.2rem', padding: '4px' }}
           />
            <button onClick={handleSaveClick}>Save</button>
          </>
          ) : (
            <div style= {{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 style={{ margin: 0 }}>{PlaylistName}</h2>
            <button onClick={handleEditClick} style={{ borderRadius: '20px', padding: '4px 0px 4px 4px', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faPen} style={{ marginRight: '6px' }} />
            </button>
          </div>
        )}
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
                      <button style={{ backgroundColor: 'green', color: 'white', borderRadius: '8px', fontSize: '1.5rem', justifyContent: 'center', marginLeft: '225px', marginRight: '215px' }}>Add To Spotify!</button>

           </div>
        </div>
    )
  }


  export default Playlist;