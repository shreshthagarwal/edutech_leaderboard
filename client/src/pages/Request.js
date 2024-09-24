// src/pages/Request.js
import React, { useState } from 'react';
import axios from 'axios';

function Request() {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get the token from localStorage
    try {
      const response = await axios.post(
        'http://localhost:3000/api/request',
        { heading, description, imageURL },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Request submitted successfully');
    } catch (error) {
      setMessage('Error submitting request');
    }
  };

  return (
    <div>
      <h2>Submit Achievement</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Achievement Heading" value={heading} onChange={(e) => setHeading(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="url" placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Request;
