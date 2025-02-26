// CharactersTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CharactersTable.css';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'owner', label: 'Owner' },
];

const CharacterRow = ({ character, onSelectCharacter }) => (
  <tr onClick={() => onSelectCharacter && onSelectCharacter(character)}>
    {columns.map((column) => (
      <td key={column.key}>{character[column.key]}</td>
    ))}
  </tr>
);

const CharactersTable = ({ refresh, onSelectCharacter }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/characters')
      .then((response) => {
        setCharacters(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [refresh]);

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {characters.map((character) => (
          <CharacterRow
            key={character.id}
            character={character}
            onSelectCharacter={onSelectCharacter}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CharactersTable;
