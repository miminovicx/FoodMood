// Database connection
require("./models/db");

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var config = require('./config');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// enabling cors
app.use(cors(config.corsOptions));

// enabling helmet
app.use(helmet(config.helmetOptions));

//passport initialization
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: false,
  saveUninitialized: true,
  name: "sessionId"
}));

app.use(passport.initialize());
app.use(passport.session());

var indexRouter = require('./routes/index');
var authRouter = require('./routes/authenticate.router');
var usersRouter = require('./routes/users.router');
var mainRouter = require('./routes/main.routes');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/home', mainRouter);

const options={
    key : fs.readFileSync(path.join(__dirname,'./cert/key.pem')),
    cert : fs.readFileSync(path.join(__dirname,'./cert/cert.pem'))
}

const sslServer = https.createServer(options,app);
// sslServer.listen(3000 ,() => {
//   console.log('Secure server is listening on port 3000');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status = err.status || 500;
  res.render('error');
});

module.exports = app;
