/**
 * @controller Authenticate 
 */

const User = require("../models/user");
const passport = require("passport");


exports.loginView = (req, res, next) => {
    res.render("auth/login", { message: req.flash("error") });
};


exports.loginUser = (req, res, next) => {
    passport.authenticate("local")(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/users/test");
        }
    });
};

exports.registerView = (req, res, next) => {
    res.render("auth/register", { title: "OK" });
};


exports.addUser =(req, res, next) => {
    try {
        User.register(
            new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
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
                        res.redirect("/auth/test");
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


exports.logout =(req, res, next) => {
    if (req.session) {
        req.session.destroy();
        req.logOut();
        res.clearCookie('session-id');
        res.redirect('/auth/login');
        }
        else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
        }
};

exports.isLogIn = (req,res,next) => {
    if (!req.isAuthenticated()) return res.status(401).send({ message: "Unauthorized!" });
    next();
};
