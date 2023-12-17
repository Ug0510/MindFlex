const express = require('express');
const mongoose = require('mongoose'); 
const db = require('./config/mongoose');
const GameCode = require('./model/GameCode');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

app.use('/',require('./routes'));

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
