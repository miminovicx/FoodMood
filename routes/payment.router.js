/**
 * @router Payment
 */

var express = require("express");
var router = express.Router();
var auth = require("../controllers/authenticate.controller");
var controller = require("../controllers/payment.controller");

// GET
router.get("/",controller.paymentView);

// POST
// router.post("/",auth.isLogIn,controller.pay);
router.post("/",controller.pay);


module.exports = router;