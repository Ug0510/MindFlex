const express = require('express');
const router = express.Router();
const teacherController = require('../../controllers/api/teacher');

router.post('/register', teacherController.register);
router.post('/login', teacherController.login);

module.exports = router;
