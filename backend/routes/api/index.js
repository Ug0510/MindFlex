const express = require('express');

const router = express.Router();

router.use('/game-codes',require('./game-codes'));
router.use('/student',require('./student'));
router.use('/teacher',require('./teacher'));
router.use('/quiz',require('./quiz'));

module.exports = router;