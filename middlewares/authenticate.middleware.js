/**
 * @middleware Authenticate
 */

exports.isLogIn = (req,res,next) => {
    if (!req.isAuthenticated()) return res.status(401).send({ message: "Unauthorized!" });
    next();
};

exports.isUser = (req,res,next) => {
    if(req.isAuthenticated()){
        err = new Error("Not a user");
        err.status = 401;
        next(err);
    } else {
        res.redirect("/auth/login");
    }
};

exports.isUserId = (req,res,next) => {
    if (req.isAuthenticated()) return req.user._id;
      return null;
};
