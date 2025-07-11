import React from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import './App.css'

function App() {

  

   return (
    <div>
      <h1>Jammming</h1>
      <SearchBar />
      <SearchResults />
      <Playlist />
    </div>
  );
}

  

 export default SearchBar;