/**
 * @router Main
 */

var express = require("express");
var router = express.Router();
var auth = require("../controllers/authenticate.controller");
var controller = require("../controllers/main.controller");
var userController = require("../controllers/users.controller");

// GET
router.get("/",controller.mainView);

// POST
router.post("/",[auth.isLogIn,userController.hasCoins],controller.process);



module.exports = router;