const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
const MONGO_URI = "mongodb://localhost/ultimate_genius"; // Get your MongoDB connection string from .env file

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema for storing game codes
const GameCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const GameCode = mongoose.model('GameCode', GameCodeSchema);

// Enable CORS
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define API route to receive game codes
app.post('/api/game-codes', async (req, res) => {
  console.log(req.body);
  const { code } = req.body;
  console.log(code);

  // Validate the received code
  if (!code || code.length !== 6) {
    return res.status(400).send({ message: 'Invalid game code' });
  }

  // Create a new GameCode document
  const newCode = new GameCode({ code });

  try {
    await newCode.save();
    res.status(201).send({ message: 'Game code submitted successfully!' });
  } catch (error) {
    console.error('Error saving game code:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
