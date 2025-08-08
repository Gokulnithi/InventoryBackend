const express =require('express');
const Router = express.Router()
const verifyMe = require('../controller/authUserController');
const verifyToken = require('../middleware/authMiddleware');
const router = require('./authRoutes');
router.get('/auth/user',verifyToken,verifyMe);
module.exports = router;