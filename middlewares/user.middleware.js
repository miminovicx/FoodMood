/**
 * @middleware User
 */

const User = require("../models/user");

// checks if the user already exists
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

// gets a user by his id
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

// checks if the user is an admin
exports.isAdmin = (userId) => {
  try {
    let user = User.findById({userId}).then((us) => {
      console.log(us);
      // if(user && user.admin){
      //   return true;
      // }

    });
    //return false;
  } catch (error) {
    console.error(err);
    next(err);
  }
}

