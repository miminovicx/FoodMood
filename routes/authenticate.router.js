/**
 * @router Authenticate
 */

let User = require("../models/user");
var express = require("express");
var router = express.Router();
var controller = require("../controllers/authenticate.controller");
const passport = require("passport");
var authenticate = require("../middlewares/authenticate.middleware");



// Parse Json
const bodyParser = require('body-parser');
router.use(bodyParser.json());

// Get our authenticate module
var authenticate = require('../config/authenticate');

//GET
// Login  
router.get('/', [controller.isLogIn],(req, res, next) =>{
    // Get all records
    User.find({})
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

//Login
router.get("/login", controller.loginView);

//Logout
router.get("/logout", controller.logout);

//POST

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
 
    // Create a token
    // var token = authenticate.getToken({_id: req.user._id});
    
    // // Response
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // res.json({success: true, token: token, status: 'You are successfully logged in!'});
    res.redirect('/home/');
   });
     

// Inscription
router.post("/register", controller.addUser);


module.exports = router;