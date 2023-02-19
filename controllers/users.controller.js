/**
 * @controller Users
 */

const User = require("../models/user");
const usersMiddleware = require("../middlewares/user.middleware");
const passport = require("passport");


var controller = {
    userAccount: async(req, res, next) => {
        console.log(req.user);
        res.render("user/space", { user: req.user });
    },

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
};

module.exports = controller;
