const express = require('express');

const router = express.Router();

router.use('/game-codes',require('./game-codes'));

module.exports = router;