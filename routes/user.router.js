/**
 * @router User
 */

 let User = require("../models/user.model");
 var express = require("express");
 var router = express.Router();
 var controller = require("../controllers/user.controller");
 const passport = require('passport');
 var authenticate = require("../middlewares/authenticate.middleware");
 

 //GET
 // user account
 router.get("/", authenticate.isUser, controller.userAccount)

 // edit/update a user
 router.get("/edit/:userId", controller.updateUser)
 
 //DELETE
 // delete a user
 router.delete("/:userId", authenticate.isUser, controller.deleteUser)
 
 module.exports = router;
 