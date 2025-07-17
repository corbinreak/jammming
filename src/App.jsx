import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import BackgroundImage from './assets/background-image.png'



function App() {

  const sampleSongs = [
  {
    id: 1,
    name: "Sodium",
    artist: "Bones",
    album: "SoThereWeStood",
  },
  {
    id: 2,
    name: "Lose Yourself",
    artist: "Eminem",
    album: "8-Mile",
  },
  {
    id: 3,
    name: "We Will Rock You",
    artist: "Queen",
    album: "Greatest Hits; Disc 1"
  }
]

  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [PlaylistName, setPlaylistName] = useState('My Playlist');
  const [searchResults, setSearchResults] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(sampleSongs);
  const [hasSearched, setHasSearched] = useState(false);
    function handleSearch(searchInput) {

      const lowerInput = searchInput.toLowerCase();
      

        const results = sampleSongs.filter(song =>
          song.name.toLowerCase().includes(lowerInput) ||
          song.artist.toLowerCase().includes(lowerInput) ||
          song.album.toLowerCase().includes(lowerInput)
  );
 

         setFilteredSongs(results);
         setHasSearched(true);
    }

     const handleRemoveTrack = (idToRemove) => {
      setPlaylistTracks(prev => 
        prev.filter(track => track.id !== idToRemove)
      );
     }

     const handleAddTrack = (track) => {
      if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
        setPlaylistTracks(prev => [...prev, track]);
        setFilteredSongs(prev => prev.filter(song => song.id !== track.id));
      }
     }

    const backgroundStyle = {
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      width: '100%',
      color: 'white',

      
    }

    const headerStyle = {
       backgroundColor: 'black',
       color: 'red',
       border: '1px solid black',
       position: 'relative',
       width: '100%',
       fontStyle: 'italic',
       textAlign: 'center',
       
    }

    const appStyle = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '2rem',
      justifyContent: 'center',

    }

    const searchStyle = {
      flex: 1,
      padding: '1rem',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: '8px',
      marginTop: '28px',
      minHeight: '50vh',
      marginLeft: '10px'
      
    }

    const playlistStyle = {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: '1rem',
      borderRadius: '8px',
      marginTop: '28px',
      marginRight: '10px',


    }


   return (
  <div style={backgroundStyle}>
    <div style={headerStyle}>
      <h1>Jammming</h1>
    </div>

    <div style={appStyle}> 
      <div style={searchStyle}>
        <SearchBar onSearch={handleSearch} />
        {hasSearched && <SearchResults songs={filteredSongs} onAdd={handleAddTrack} />}
      </div>

      <div style={playlistStyle}>
        <Playlist 
          PlaylistName={PlaylistName}
          tracks={playlistTracks}
          onRemove={handleRemoveTrack}
          onNameChange={setPlaylistName}
        />
      </div>
    </div>
  </div>
);


}

  

 export default App;