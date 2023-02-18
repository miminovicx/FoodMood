const mongoose = require("mongoose");
const config = require('../config');

const url = config.mongoUrl[process.env.NODE_ENV || "prod"];
var connectionOpened = false;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.set('strictQuery', false);

mongoose.connect(url,options);

mongoose.connection.on("connecting",() => {
    console.log("connecting");
});

mongoose.connection.on("error",() => {
    console.log("connection error");
});

mongoose.connection.on("connected",() => {
    console.log("connection to database successfully established");
});

mongoose.connection.on("open", function() {
    console.log("connection to database is open successfully");
    connectionOpened = true;
});

mongoose.connection.on("disconnected",() => {
    console.log("disconnected");
});

mongoose.connection.on("reconnected",() => {
    console.log("reconnected");
});

module.exports = mongoose.connection;