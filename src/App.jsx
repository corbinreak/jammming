import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import BackgroundImage from './assets/background-image.png';
import Spotify from './utillities/Spotify';

function App() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [searchResults, setSearchResults] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  function handleSearch(searchInput) {
    console.log("Searching For!", searchInput);

    Spotify.search(searchInput).then(results => {
      console.log("Original results from Spotify:", results);

      const lowerInput = searchInput.toLowerCase();

      const filtered = results.filter(song =>
        song.name.toLowerCase().includes(lowerInput) ||
        song.artist.toLowerCase().includes(lowerInput) ||
        song.album.toLowerCase().includes(lowerInput)
      );

      setSearchResults(results);
      setFilteredSongs(filtered);
      setHasSearched(true);
    });
  }

  const handleRemoveTrack = (idToRemove) => {
    setPlaylistTracks(prev =>
      prev.filter(track => track.id !== idToRemove)
    );
  };

  const handleAddTrack = (track) => {
    if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks(prev => [...prev, track]);
      setFilteredSongs(prev => prev.filter(song => song.id !== track.id));
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100%',
    color: 'white',
  };

  const headerStyle = {
    backgroundColor: 'black',
    color: 'red',
    border: '1px solid black',
    position: 'relative',
    width: '100%',
    fontStyle: 'italic',
    textAlign: 'center',
  };

  const appStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '2rem',
    justifyContent: 'center',
  };

  const searchStyle = {
    flex: 1,
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '8px',
    marginTop: '28px',
    minHeight: '50vh',
    marginLeft: '10px',
  };

  const playlistStyle = {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '1rem',
    borderRadius: '8px',
    marginTop: '28px',
    marginRight: '10px',
  };

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
            PlaylistName={playlistName}
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
