// CreateCharacterForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateCharacterForm = ({ onCharacterCreated }) => {
  const [formData, setFormData] = useState({
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
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      // Convert numeric fields to number type
      [name]: ([
        'level','charisma','constitution','dexterity','intelligence','strength','wisdom','health','max_health','initiative'
      ].includes(name)) ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/characters', formData);
      setMessage(`Character created with id: ${response.data.id}`);
      if (onCharacterCreated) onCharacterCreated();
      // Reset form
      setFormData({
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
      });
    } catch (error) {
      setMessage('Error creating character: ' + error.message);
    }
  };

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

      <div className="form-group">
        <label>Level:</label>
        <input
          type="number"
          name="level"
          value={formData.level}
          onChange={handleChange}
        />
      </div>

      {/* Repeat pattern for all numeric fields... */}
      <div className="form-group">
        <label>Health:</label>
        <input
          type="number"
          name="health"
          value={formData.health}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Max Health:</label>
        <input
          type="number"
          name="max_health"
          value={formData.max_health}
          onChange={handleChange}
        />
      </div>

      {/* ...and so on for other fields like charisma, constitution, etc. */}

      <button type="submit">Create Character</button>
    </form>
  );
};

export default CreateCharacterForm;
