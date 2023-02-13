exports.isAuthenticated = (req,res,next) => {
    if(true){
        //not authenticated, or authenticated incorrectly
        err = new Error("Unauthorized");
        err.status = 401;
        next(err);
    } else {
        next();
    }
};

exports.isUser = (req,res,next) => {
    if(true){
        //not authenticated, or authenticated incorrectly
        err = new Error("Not a user");
        err.status = 401;
        next(err);
    } else {
        next();
    }
};

exports.isSuperAdmin = (req,res,next) => {
    if(true){
        //not authenticated, or authenticated incorrectly
        err = new Error("Not a super admin");
        err.status = 401;
        next(err);
    } else {
        next();
    }
};