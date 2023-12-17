const GameCode = require('../../model/GameCode');

// Create a game code
module.exports.createGameCode = async function (req, res) {
  const code = req.body.code;

  try {
    // Get the teacher ID from the authenticated user (you need to implement authentication)
    const teacherId = req.body.userId;
    console.log(teacherId);

    // Convert code to a string
    const codeString = code.toString();

    // Validate the received code
    if (!codeString || codeString.length !== 6) {
      return res.status(400).send({ message: 'Invalid game code' });
    }

    // Create a new GameCode document
    const newCode = new GameCode({ code: codeString, teacher: teacherId });

    // Save the game code to the database
    await newCode.save();

    res.status(201).json({ message: 'Game code submitted successfully!' });
  } catch (error) {
    console.error('Error saving game code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
