const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../../model/student');


// Controller to handle student register
module.exports.register = async function(req, res){
  const { fullName, email, password } = req.body;

  try {
    // Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const newStudent = new Student({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save the student to the database
    await newStudent.save();
    res.status(200).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Controller for student login
module.exports.login = async function(req, res){
  const { email, password } = req.body;

  try {
    // Check if the student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create and send a JSON Web Token (JWT)
    // 'udit_gupta' is secret key here
    const token = jwt.sign({ studentId: student._id }, 'udit_gupta', { expiresIn: '1h' });

    res.status(200).json({ token, studentId: student._id  });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports.saveScore = async function(req, res){
  try {
    const { studentId, score } = req.body;
    console.log(req.body);

    // Check if studentId and score are present in the request body
    if (!studentId || !score) {
      return res.status(400).json({ message: 'Invalid request. Missing studentId or score.' });
    }

    // Find the student by ID
    const student = await Student.findById(studentId);

    // Check if the student exists
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    // Update the student's score
    student.score = Number(score);

    // Save the updated student
    await student.save();

    return res.status(200).json({ message: 'Score saved successfully.' });
  } catch (error) {
    console.error('Error saving score:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};