const express = require('express');
const router = express.Router();
const purchaseForm = require('../controller/purchaseForm');
const transferinForm = require('../controller/trnasferinForm');
const assignedForm = require('../controller/assignedForm');
const expendedForm = require('../controller/expendedForm');
router.post('/purchase',purchaseForm);
router.post('/transferin',transferinForm)
router.post('/:base/:id/returned',expendedForm)
router.post('/assigned',assignedForm)
module.exports = router