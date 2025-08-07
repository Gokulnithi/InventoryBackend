const express = require('express');
const router = express.Router();
const transactions = require('../controller/transactionDetails')
router.get('/transactions',transactions)

module.exports = router