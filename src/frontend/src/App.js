import React from 'react';
import './App.css';
import CharactersTable from './CharactersTable';
import CreateCharacterForm from './CreateCharacterForm';

function App() {
  return (
    <div className="container">
      <h1 className="title">DnD Campaign Characters</h1>
      <div className="form-card">
        <h2>Create New Character</h2>
        <CreateCharacterForm />
      </div>
      <CharactersTable />
    </div>
  );
}

export default App;
