/**
 * @router Main
 */

var express = require("express");
var router = express.Router();
var auth = require("../controllers/authenticate.controller");
var controller = require("../controllers/main.controller");
var user = require("../controllers/users.controller")

// GET
router.get("/",controller.mainView);
// router.get("/",controller.mainView);

// POST
router.post("/",auth.isLogIn,user.hasCoins,controller.process);
// router.post("/",controller.process);



module.exports = router;