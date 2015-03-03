var config = require('./config')
  , colors = require('colors');

module.exports = (function () {

  function log (message) {
    console.log(message.green);
  }

  log.error = function (error) {
    console.log(error.toString().red);
  }

  return log;

}());
