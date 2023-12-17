const GameCode = require('../../model/GameCode');

module.exports.create = async function(req, res) {
    const { code } = req.body;
    console.log(code);
  
    // Convert code to string
    const codeString = code.toString();
  
    // Validate the received code
    if (!codeString || codeString.length !== 6) {
      console.log(typeof(codeString));
      return res.status(400).send({ message: 'Invalid game code' });
    }
  
    // Create a new GameCode document
    const newCode = new GameCode({ code: codeString });
  
    try {
      await newCode.save();
      console.log('here');
      res.status(201).send({ message: 'Game code submitted successfully!' });
    } catch (error) {
      console.log(error);
      console.error('Error saving game code:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  }