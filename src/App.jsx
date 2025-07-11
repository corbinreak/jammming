import React from 'react';

function App() {

  function SearchBar() {
    return <div>Search Bar Here</div>; //mock function to take place and define SearchBar.
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