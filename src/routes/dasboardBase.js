const express = require('express');
const router = express.Router();
const byBase = require('../controller/byBaseDetails')
router.get('/byBase/:base',byBase);

module.exports = router