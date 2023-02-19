/**
 * @controller Users
 */

const User = require("../models/user.model");
const usersMiddleware = require("../middlewares/user.middleware");
const passport = require("passport");


var controller = {
    userAccount: async(req, res, next) => {
        console.log(req.user);
        res.render("user/space", { user: req.user });
    },

    // updates a user
    updateUser: async(req, res, next) => {
        try {
            let user = await User.findByIdAndUpdate(req.params.userId, req.body, {
                new: true,
            });
            await user.save();
            res.json(user);

        } catch (err) {
            console.error(err);
            res.render("message", { status: 400, message: err });
            next(err);
        }
    },

    // delete a user
    deleteUser: async(req, res, next) => {
        if (await usersMiddleware.isOwner(req.user._id, req.params.userId)) {
            try {
                let out = await User.findByIdAndDelete(req.params.userId);
                res.json(out);
            } catch (err) {
                console.error(err);
                res.render("message", { status: 400, message: err });
                next(err);
            }
        } else {
            res.json({ status: 401, message: "Vous n'avez pas la permission." });
        }
    },

    // checks if the user is an admin
    isAdmin: (req, res, next) => {
    //     console.log(req.user._id);
        if(!usersMiddleware.isAdmin(req.user._id)){
            res.json({ status: 401, message: "Vous n'êtes pas admin." });   
        }
        next();
    },
};

module.exports = controller;
