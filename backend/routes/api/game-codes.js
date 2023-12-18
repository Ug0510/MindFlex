const express = require('express');
const passport = require('passport');
const router = express.Router();
const GameCodesApi = require('../../controllers/api/gamecode_api');

router.post('/create',passport.authenticate('teacher-jwt', { session: false }),GameCodesApi.createGameCode);
router.post('/join', passport.authenticate('student-jwt', { session: false }), GameCodesApi.joinGame);


module.exports = router;