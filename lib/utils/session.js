var redis = require('./../redis')
  , config = require('./../config')
  , uuid = require('uuid');

exports.set = function (value, callback) {
  var key = genKey();
  return redis.set((config.session.prefix + key), value,
    function (error) {
      return callback(error, key);
    }
  );
}

exports.get = function (key, callback) {
  return redis.get((config.session.prefix + key), callback);
}

var genKey = function (key) {
  return uuid.v4();
}
