const express = require('express');

const router = express.Router();
const Quiz = require('../../controllers/api/quiz');

router.post('/start',Quiz.startQuiz);
router.post('/is-started',Quiz.checkQuizStarting);
router.get('/scores', Quiz.getScores);
router.post('/finish-quiz',Quiz.endQuiz);

module.exports = router;    