import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import './App.css'


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
  const [playlistName, setPlaylistName] = useState('My-Playlist');
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
      }
     }

   return (
   <>
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar onSearch={handleSearch} />
      {hasSearched && <SearchResults songs={filteredSongs} onAdd={handleAddTrack}/>}
      
      
    </div>
    <div className="playlist-section">
      <Playlist 
       playlistName={playlistName}
       tracks={playlistTracks}
       onRemove={handleRemoveTrack}
       onNameChange={setPlaylistName}
        />
    </div>
   </> 
  ); 

}

  

 export default App;