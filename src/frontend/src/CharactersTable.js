// CharactersTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharactersTable = ({ refresh }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/characters')
      .then(response => {
        setCharacters(response.data);
        setLoading(false);
      })
      .catch(err => {
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
          <th>ID</th>
          <th>Name</th>
          <th>Owner</th>
          <th>Class</th>
          <th>Level</th>
          <th>Health</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {characters.map((char) => (
          <tr key={char.id}>
            <td>{char.id}</td>
            <td>{char.name}</td>
            <td>{char.owner}</td>
            <td>{char.char_class}</td>
            <td>{char.level}</td>
            <td>{char.health} / {char.max_health}</td>
            <td>
              {char.created_at
                ? new Date(char.created_at).toLocaleString()
                : ''}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CharactersTable;
