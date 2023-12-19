const GameCode = require('../../model/GameCode');

module.exports.startQuiz = async (req, res) => {
  const { code } = req.body;

  try {
    // Find the game code in the database
    const gameCode = await GameCode.findOne({ code });

    if (!gameCode) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Update isStarted to true
    gameCode.isStarted = true;

    // Save the updated game code
    await gameCode.save();

    // Respond with success message
    res.status(200).json({ message: 'Quiz started successfully' });
  } catch (error) {
    console.error('Error starting quiz:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// To check if quiz is started 
module.exports.checkQuizStarting = async (req, res) => {
  const {code}  = req.body;

  try {
    // Find the game code in the database
    const gameCode = await GameCode.findOne({ code });

    if (!gameCode) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Respond with the isStarted status
    res.status(200).json({ isQuizStarted: gameCode.isStarted });
  } catch (error) {
    console.error('Error checking quiz status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};