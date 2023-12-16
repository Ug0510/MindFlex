const mongoose = require('mongoose');

// Schema for storing game codes
const GameCodeSchema = new mongoose.Schema({
    code: { 
        type: String, 
        required: true, 
        unique: true 
    },
  },{
    timestamps:true
  });
  
const GameCode = mongoose.model('GameCode', GameCodeSchema);

module.exports = GameCode;