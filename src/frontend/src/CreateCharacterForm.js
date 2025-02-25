import React, { useState } from 'react';
import axios from 'axios';
import './CreateCharacterForm.css';

const CreateCharacterForm = ({ onCharacterCreated }) => {
  const initialState = {
    owner: '',
    name: '',
    char_class: '',
    level: 1,
    charisma: 0,
    constitution: 0,
    dexterity: 0,
    intelligence: 0,
    strength: 0,
    wisdom: 0,
    health: 10,
    max_health: 10,
    initiative: 0
  };

  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/characters', formData);
      setMessage(`Character created with id: ${response.data.id}`);
      if (onCharacterCreated) onCharacterCreated();
      setFormData(initialState); // Reset form after submission
    } catch (error) {
      setMessage('Error creating character: ' + error.message);
    }
  };

  // Array for numeric fields
  const numericFields = [
    { label: 'Level', name: 'level' },
    { label: 'Charisma', name: 'charisma' },
    { label: 'Constitution', name: 'constitution' },
    { label: 'Dexterity', name: 'dexterity' },
    { label: 'Intelligence', name: 'intelligence' },
    { label: 'Strength', name: 'strength' },
    { label: 'Wisdom', name: 'wisdom' },
    { label: 'Health', name: 'health' },
    { label: 'Max Health', name: 'max_health' },
    { label: 'Initiative', name: 'initiative' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      {message && <p>{message}</p>}

      <div className="form-group">
        <label>Owner:</label>
        <input
          type="text"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Class:</label>
        <input
          type="text"
          name="char_class"
          value={formData.char_class}
          onChange={handleChange}
        />
      </div>

      <div className="numeric-fields">
        {numericFields.map(field => (
          <div className="form-group" key={field.name}>
            <label>{field.label}:</label>
            <input
              type="number"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <button type="submit">Create Character</button>
    </form>
  );
};

export default CreateCharacterForm;
