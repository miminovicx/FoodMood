/**
 * @router Authenticate
 */

let user = require("../models/user.model");
var express = require("express");
var router = express.Router();
var controller = require("../controllers/authenticate.controller");
const passport = require("passport");

// Parse Json
const bodyParser = require('body-parser');
router.use(bodyParser.json());

// Login  
router.get('/', [controller.isLogIn],(req, res, next) =>{
    // Get all records
    user.find({})
      .then((users) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          // format result as json
          res.json(users);
      }, (err) => next(err))
      .catch((err) => next(err));
    });
    
//Register
router.get("/register", controller.registerView);
router.post("/register", controller.addUser);
    
//Logout
router.get("/logout", controller.logout);

// Login
router.post('/login', controller.loginUser);
     



module.exports = router;