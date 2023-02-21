/**
 * @router Main
 */

var express = require("express");
var router = express.Router();
var auth = require("../controllers/authenticate.controller");
var controller = require("../controllers/main.controller");

// GET
router.get("/",auth.isLogIn,controller.mainView);

// POST
router.post("/",auth.isLogIn,controller.process);



module.exports = router;