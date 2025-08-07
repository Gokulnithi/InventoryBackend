const baseSend = require('../controller/baseListManage')
const express = require("express");
const router = express.Router();
const productRoute = router.get("/:base/:id", baseSend);
module.exports = productRoute;
