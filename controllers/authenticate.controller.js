/**
 * @controller Authenticate 
 */

const User = require("../models/user");
const passport = require("passport");
var authenticate = require('../config/authenticate');


exports.loginView = (req, res, next) => {
    res.render("auth/login", { message: req.flash("error") });
};

// logs in a user
exports.loginUser = (req, res, next) => {
    passport.authenticate("local")(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            // Create a token
            var token = authenticate.getToken({_id: req.user._id});
            
            // Response
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, token: token, status: 'You are successfully logged in!'});
        }
    });
};    

exports.registerView = (req, res, next) => {
    res.render("auth/register", { title: "OK" });
};

// adds a new user
exports.addUser =(req, res, next) => {
    try {
        User.register(
            new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                admin: req.body.admin
            }),
            req.body.password,
            (err, user) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({err: err});
                } else {
                    passport.authenticate("local")(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success: true, status: 'Registration Successful!'});
                        // res.redirect("/auth/test");
                    });
                }
            }
        );
    } catch (err) {
        console.error(err);
        next(err);
        res.redirect("/auth/register");
    }
};

// logs out the user from the session
exports.logout =(req, res, next) => {
    if (req.session) {
        req.session.destroy();
        req.logOut();
        res.statusCode = 210; // status code to edit
        res.setHeader('Content-Type', 'application/json');
        res.clearCookie('session-id');
        res.json({status:"You are successfully logged out!"})
        res.redirect('/auth/login');
       
        }
        else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
        }
};

// checks if the user is logged in
exports.isLogIn = (req,res,next) => {
    if (!req.isAuthenticated()) return res.status(401).send({ message: "Unauthorized!" });
    next();
};
