import React from 'react';

function App() {

  function SearchBar() {
    return <div>Search Bar Here</div>; //mock function to take place and define SearchBar.
  }

  function SearchResults() {
    return <div>Search Results Here</div>; //mock function to take place and define results.
  }

  function Playlist() {
    return <div>Playlist section here</div>; //mock function to take place and define results.
  }

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar />
      <SearchResults />
      <Playlist />
    </div>
  );
}

export default App;