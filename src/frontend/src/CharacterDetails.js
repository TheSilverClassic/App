// CharacterDetails.js

import React from 'react';
import './CharactersSplitView.css';

const CharacterDetails = ({ character }) => {
  if (!character) {
    return <div className="details-placeholder">Select a character to see details</div>;
  }

  return (
    <div className="details-card">
      <h2>
        {character.name} ({character.char_class || 'Unknown Class'})
      </h2>
      <div className="details-grid">
        <div><strong>Owner:</strong> {character.owner}</div>
        <div><strong>Level:</strong> {character.level}</div>
        <div><strong>Health:</strong> {character.health} / {character.max_health}</div>
        <div><strong>Charisma:</strong> {character.charisma}</div>
        <div><strong>Constitution:</strong> {character.constitution}</div>
        <div><strong>Dexterity:</strong> {character.dexterity}</div>
        <div><strong>Intelligence:</strong> {character.intelligence}</div>
        <div><strong>Strength:</strong> {character.strength}</div>
        <div><strong>Wisdom:</strong> {character.wisdom}</div>
        <div><strong>Initiative:</strong> {character.initiative}</div>
      </div>
    </div>
  );
};

export default CharacterDetails;
