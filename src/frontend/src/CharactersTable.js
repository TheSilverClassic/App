import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CharactersTable.css';

// Define table columns in one place.
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'owner', label: 'Owner' },
  { key: 'char_class', label: 'Class' },
  { key: 'level', label: 'Level' },
  { key: 'health', label: 'Health' },
  { key: 'created_at', label: 'Created At' },
];

// Component to render a single character row.
const CharacterRow = ({ character }) => (
  <tr>
    {columns.map((column) => {
      let cellData = character[column.key];
      if (column.key === 'health') {
        // Combine health and max_health.
        cellData = `${character.health} / ${character.max_health}`;
      } else if (column.key === 'created_at' && cellData) {
        cellData = new Date(cellData).toLocaleString();
      }
      return <td key={column.key}>{cellData}</td>;
    })}
  </tr>
);

const CharactersTable = ({ refresh }) => {
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
          <CharacterRow key={character.id} character={character} />
        ))}
      </tbody>
    </table>
  );
};

export default CharactersTable;
