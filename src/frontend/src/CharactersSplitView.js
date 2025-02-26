// CharactersSplitView.js

import React, { useState } from 'react';
import CharactersTable from './CharactersTable';
import CharacterDetails from './CharacterDetails';
import './CharactersSplitView.css';

const CharactersSplitView = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="split-view-container">
      <div className="table-section">
        <CharactersTable onSelectCharacter={handleSelectCharacter} />
      </div>
      <div className="details-section">
        <CharacterDetails character={selectedCharacter} />
      </div>
    </div>
  );
};

export default CharactersSplitView;
