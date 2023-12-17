const express = require('express');
const mongoose = require('mongoose'); 
const db = require('./config/mongoose');
const GameCode = require('./model/GameCode');
const passport = require('passport');
const passportJWT = require('./config/passport_jwt_Strategy'); 
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());

// Include Passport JWT Strategy middleware
passportJWT(passport); // Assuming you have a function in passport_jwt_Strategy.js that configures the JWT strategy

// Your routes
app.use('/', require('./routes'));

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
