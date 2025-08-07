const express = require('express')
const router  = express.Router();
const listUser = require('../controller/listUser')
const verifyToken = require('../middleware/authMiddleware')
router.get("/me", verifyToken, listUser);
  

module.exports = router;