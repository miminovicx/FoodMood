const mongoose = require("mongoose");
const config = require('../config');
const chalk = require('chalk');
const ora = require('ora');


const url = config.mongoUrl[process.env.NODE_ENV || "prod"];
var connectionOpened = false;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.set('strictQuery', false);

mongoose.connect(url,options);

var spinner = ora("Trying to connect to the database...\n").start();
var connectionOpened = false;

mongoose.connection.on("connecting", function() {
    spinner.start();
});

mongoose.connection.on("error", function(error) {
    spinner.stop();
    console.error(chalk.bgKeywork("orange").black(" ERROR   ", chalk.bgKeywork("orange")("Error in MongoDB connection: " + error)));
});

mongoose.connection.on("connected", function() {
    spinner.stop();
    console.log(chalk.black(" CONNECTED   "), chalk.green("Connection to the database successfully etablished."));
});

mongoose.connection.on("open", function() {
    console.log(chalk.black("         OPEN "), chalk.green("Connection to the database is open successfully."));
    connectionOpened = true;
});

mongoose.connection.on("reconnected",() => {
    console.log("reconnected");
});

mongoose.connection.on("disconnected", function() {
    if(connectionOpened) {
        console.log(chalk.bgRed.black(" DISCONNECTED    ", chalk.red("Connection to the database lost.")));
        spinner = ora("Trying to reconnect to the database\n").start()
    }
});

module.exports = mongoose.connection;