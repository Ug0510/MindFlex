const express = require('express');

const router = express.Router();

router.use('/game-codes',require('./game-codes'));
router.use('/student',require('./student'));

module.exports = router;