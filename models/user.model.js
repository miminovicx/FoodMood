/**
 * @model User
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var user = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
  },
  { collection: "users", timestamps: true });

user.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', user);
