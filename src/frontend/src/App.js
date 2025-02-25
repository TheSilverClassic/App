/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

// src/App.js
import React from 'react';
import './App.css';
import CharactersTable from './CharactersTable'; // Import the CharactersTable component

function App() {
  return (
    <div className="App">
      <h1>DnD Campaign Characters</h1>
      <CharactersTable />  {/* Render the CharactersTable */}
    </div>
  );
}

export default App;
