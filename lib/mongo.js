var config = require('./config').mongo
  , log = require('./log')
  , mongoose = require('mongoose');

module.exports = (function () {

  var connection = mongoose.createConnection(config.url);
  connection.on('error', log.error);
  
  return connection;

})();
