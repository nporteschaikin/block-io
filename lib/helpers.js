var session = require('./session')
  , log = require('./log')
  , User = require('./models').User
  , _ = require('lodash');

module.exports = (function () {

  var helpers = {};

  helpers.onAuth = function (response) {
    return function (where, attributes) {
      var callback = helpers.onAuthCallback(response);
      if (!_.isObject(where)) {
        return User.findOne({_id: where}).exec(
          function (error, user) {
            if (!user) return helpers.returnUnauthorized(response);
            if (attributes) return user.update({$set: attributes});
            return helpers.createSession(user, response);
          }
        )
      }
      return User.findOne(where).exec(
        function (error, user) {
          if (!user) return User.create(_.merge(where, attributes), callback);
          return user.set(attributes).save(callback);
        }
      )
    }
  }

  helpers.onAuthCallback = function (response) {
    return function (error, user) {
      return helpers.createSession(user, response);
    }
  }

  helpers.onAuthError = function (response) {
    return function (error) {
      if (error) log.error(error);
      return helpers.returnUnauthorized(response);
    }
  }

  helpers.createSession = function (user, response) {
    return session.set(user.id,
      function (error, key) {
        log('Session ' + key + ' created.');
        return response.status(200).send(key);
      }
    )
  }

  helpers.returnUnauthorized = function (response) {
    return response.status(400).end();
  }

  helpers.onCompletion = function (request, response) {
    return function (error, result) {
      if (error) {
        log.error(error);
        return response.status(500).end();
      }
      return response.json(result);
    }
  }

  return helpers;

}());
