var redis = require('./redis')
  , config = require('./config')
  , Models = require('./models')
  , uuid = require('uuid');

module.exports = (function () {

  var session = {};

  session.generateKey = function () {
    return uuid.v4();
  }

  session.set = function (value, callback) {
    var key = session.generateKey();
    return redis.set((config.session.prefix + key), value,
      function (error) {
        return callback(error, key);
      }
    );
  }

  session.get = function (key, callback) {
    return redis.get((config.session.prefix + key), callback);
  }

  function genKey (key) {
    return uuid.v4();
  }

  return session

}())
