var utils = require('./../utils')
  , User = require('./../models').User
  , Promise = require('bluebird');

module.exports = (function () {

  var auth = function (token) {
    return new Promise(
      function (resolve, reject) {
        return utils.session.get(token,
          function (error, id) {
            if (error || !id) return reject(error);
            return User.findOne({_id: id}).exec(
              function (error, user) {
                if (error) return reject(error);
                return resolve(user);
              }
            )
          }
        )
      }
    )
  };

  auth.verify = function (request, response, next) {
    if (!request.user) return response.status(400).end();
    return next();
  };

  return auth;

}());
