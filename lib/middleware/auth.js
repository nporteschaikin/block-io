var utils = require('./../utils');

module.exports = (function () {

  return function (request, response, next) {
    var token = (request.query.token || request.body.token);
    return utils.auth(token).then(
      function (user) {
        if (user) request.user = user;
        return next();
      }
    ).catch(
      function () {
        return next();
      }
    )
  }

}());
