const GameCode = require('../../model/GameCode');
const Student = require('../../model/student');

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

// Controller to change status of isStarted to false
module.exports.endQuiz = async function(req,res)
{
  const {code } = req.body;
  console.log(code);

// Find the game code in the database
  const gameCode = await GameCode.findOne({ code });

  if(!gameCode)
  {
    return res.status(404).json({message:'Game not found'}); 
  }

  gameCode.isStarted = false;

  await gameCode.save();

  return res.status(200).json({message:'sucessfully changed'});
}


// Controller to get scores for a given game code
module.exports.getScores = async function(req, res){
  const { gameCode } = req.query;

  try {
    // Find the game code in the database
    const game = await GameCode.findOne({ code: gameCode }).populate({
      path: 'students',
    select: 'fullName email score',
    });

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    if(game.isStarted)
    {
      return res.status(200).json({students:-1});
    }

    // sending scores with names
    const scores = game.students
    return res.status(200).json({ scores });
  } catch (error) {
    console.error('Error fetching scores:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};