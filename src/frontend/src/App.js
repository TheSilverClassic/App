// App.js
import React from 'react';
import './App.css';
import CharactersTable from './CharactersTable';

function App() {
  return (
    <div className="dark-mode">
      <h1>DnD Campaign Characters</h1>
      <CharactersTable />
    </div>
  );
}

export default App;
