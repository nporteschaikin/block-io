var auth = require('./auth')
  , helpers = require('./helpers');

module.exports = (function () {

  var middleware = {};

  middleware.auth = function (request, response, next) {
    var token = (request.query.token || request.body.token);
    return auth(token)
      .then(
        function (user) {
          request.user = user;
          return next();
        }
      )
      .catch(
        function () {
          return next();
        }
      )
  }

  middleware.verify = function (request, response, next) {
    if (!request.user) return helpers.returnUnauthorized(response);
    return next();
  }

  return middleware;

}());
