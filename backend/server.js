const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Define the data directory
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Save user data
app.post('/save', (req, res) => {
  const { userId, data } = req.body;

  // Validate request body
  if (!userId || !data) {
    return res.status(400).json({ message: 'Invalid request. Missing userId or data.' });
  }

  const filePath = path.join(DATA_DIR, `${userId}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(200).json({ message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Failed to save data.' });
  }
});

// Load user data
app.get('/load/:userId', (req, res) => {
  const { userId } = req.params;

  const filePath = path.join(DATA_DIR, `${userId}.json`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'User data not found.' });
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.status(200).json(data);
  } catch (error) {
    console.error('Error loading data:', error);
    res.status(500).json({ message: 'Failed to load data.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
