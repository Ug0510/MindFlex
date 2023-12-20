const express = require('express');

const router = express.Router();
const Student = require('../../controllers/api/student');

router.post('/register',Student.register);
router.post('/login',Student.login);
router.post('/save-score',Student.saveScore);
router.post('/get-score',Student.getScore);

module.exports = router;    