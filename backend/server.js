const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

// Create the table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
db.query(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating table:', err);
  }
});

// API endpoint to get all notes
app.get('/notes', (req, res) => {
  const query = 'SELECT * FROM notes';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching notes' });
    }
    res.json(results);
  });
});

// API endpoint to create a new note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const query = 'INSERT INTO notes (title, content) VALUES (?, ?)';
  db.query(query, [title, content], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving note' });
    }
    res.status(201).json({ message: 'Note saved successfully' });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
