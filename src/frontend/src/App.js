// App.js

import React from 'react';
import './App.css';
import CharactersSplitView from './CharactersSplitView';
import CreateCharacterForm from './CreateCharacterForm';

function App() {
  return (
    <div className="container">
      <h1 className="title">DnD Campaign Characters</h1>
      <div className="form-card">
        <h2>Create New Character</h2>
        <CreateCharacterForm />
      </div>
      <CharactersSplitView />
    </div>
  );
}

export default App;
