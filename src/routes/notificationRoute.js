const express = require('express')
const router = express.Router();
const notificationDue = require('../controller/notificationDue')
router.get('/notifications/due/:base',notificationDue);
module.exports = router;