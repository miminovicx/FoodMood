/**
 * @router User
 */

 let User = require("../models/user");
 var express = require("express");
 var router = express.Router();
 var controller = require("../controllers/users.controller");
 const passport = require('passport');
 var authenticate = require("../middlewares/authenticate.middleware");
 

 //GET
 // Espace utilisateur
 router.get("/", authenticate.isUser, controller.userAccount)

 // Modifier un utilisateur
 router.get("/edit/:userId", controller.updateUser)
 
 //DELETE
 // Suppression d'un utilisateur
 router.delete("/:userId", authenticate.isUser, controller.deleteUser)


 module.exports = router;
 