const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Teacher = require('../../model/teacher');

// Teacher registration
module.exports.register = async function (req, res) {
  const { fullName, email, password } = req.body;

  try {
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({
      fullName,
      email,
      password: hashedPassword,
    });

    await newTeacher.save();

    res.status(200).json({ message: 'Teacher registered successfully' });
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Teacher login
module.exports.login = async function (req, res) {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Here 'udit_gupta' is the secret key 
    const token = jwt.sign({ sub: teacher._id }, 'udit_gupta', { expiresIn: '1h' });

    res.status(200).json({ token, userId:teacher._id.toString() });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
