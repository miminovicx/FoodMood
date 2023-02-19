/**
 * @middleware User
 */

const User = require("../models/user");


  exports.checkIfUserExist = (userId) => {
    try {
      if (User.findById(userId)) {
        return true;
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
    return false;
  };

  
  exports.getUser= (userId) => {
    try {
      let user = User.findById(userId);
      if (user) return user;
    } catch (err) {
      console.error(err);
      next(err);
    }
    return false;
  };

  
  exports.isOwner =(userId, ownerId) => {
    if (userId == ownerId)
      return true
    return false
  };

