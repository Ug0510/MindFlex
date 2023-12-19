const GameCode = require('../../model/GameCode');

// Create a game code
module.exports.createGameCode = async function (req, res) {
  const code = req.body.code;

  try {
    // Get the teacher ID from the authenticated user (you need to implement authentication)
    const teacherId = req.body.teacherId;
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

// Add a new method to handle joining a game
module.exports.joinGame = async (req, res) => {
  const code = req.body.code;
  const studentId = req.body.studentId;

  try {
    // Validate the received code
    if (!code || code.length !== 6) {
      return res.status(400).json({ message: 'Invalid game code' });
    }

    // Find the game code in the database
    const gameCode = await GameCode.findOne({ code });

    if (!gameCode) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if the student is already present in the array
    if (gameCode.students.includes(studentId)) {
      return res.status(400).json({ message: 'Student already joined this game' });
    }

    // Add the student to the gameCode's students array
    if (studentId) {
      gameCode.students.push(studentId);
    }

    // Save the updated game code
    await gameCode.save();

    res.status(200).json({ message: 'Successfully joined the game' });
  } catch (error) {
    console.error('Error joining the game:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// controller to fetch the list of students joining the quiz
module.exports.getStudents = async function(req, res){
    try {
      const code = req.query.code;

      // Validate the received code
      if (!code || code.length !== 6) {
        return res.status(400).json({ message: 'Invalid game code' });
      }

      // Find the game code in the database
      const gameCode = await GameCode.findOne({ code }).populate('students');;

      if (!gameCode) {
        return res.status(404).json({ message: 'Game not found' });
      }

      // Return the students array
      return res.status(200).json({ students: gameCode.students });
    } catch (error) {
      console.error('Error fetching students:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
};


// Add a new method to check the status of the quiz
module.exports.checkQuizStatus = async (req, res) => {
  const code = req.query.code;

  try {
    // Validate the received code
    if (!code || code.length !== 6) {
      return res.status(400).json({ message: 'Invalid game code' });
    }

    // Find the game code in the database
    const gameCode = await GameCode.findOne({ code });

    if (!gameCode) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if(gameCode.isStarted == True)
    {
      res.status(200).json({ isQuizStarted: gameCode.isStarted });
    }

  } catch (error) {
    console.error('Error checking quiz status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};