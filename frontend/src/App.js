import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch notes from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/notes')
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  }, []);

  // Handle form submission to add a new note
  const handleAddNote = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/notes', { title, content })
      .then(response => {
        // Refresh the notes list
        setNotes([...notes, { title, content }]);
        setTitle('');
        setContent('');
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={handleAddNote}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <button type="submit">Add Note</button>
      </form>

      <h2>All Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>{new Date(note.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
