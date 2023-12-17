
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gameCode: { type: String, default: null }, // Optional gameCode with a default value of null
  score: { type: Number, default: null },    // Optional score with a default value of null
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
