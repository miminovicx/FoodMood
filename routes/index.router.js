/**
 * @router index
 */

var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.redirect("/home")
});

module.exports = router;

