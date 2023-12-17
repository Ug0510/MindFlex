const mongoose = require('mongoose');

const gameCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

const GameCode = mongoose.model('GameCode', gameCodeSchema);

module.exports = GameCode;
