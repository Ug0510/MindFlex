const express = require('express');

const router = express.Router();
const GameCodesApi = require('../../controllers/api/gamecode_api');

router.post('/create',GameCodesApi.createGameCode);

module.exports = router;