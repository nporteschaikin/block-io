var User = require('./../models').User
  , session = require('./../session')
  , Promise = require('bluebird')
  , _ = require('lodash');

module.exports = (function () {

  function auth (token) {
    return new Promise(
      function (resolve, reject) {
        return session.get(token,
          function (error, id) {
            if (error || !id) return reject(error);
            return User.find(id)
              .complete(
                function (error, user) {
                  if (error) return reject(error);
                  return resolve(user);
                }
              )
          }
        )
      }
    )
  }

  auth.facebook = require('./facebook');
  auth.session = require('./session');

  return auth;

}());
