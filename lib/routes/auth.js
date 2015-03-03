var User = require('./../models').User
  , auth = require('./../auth')
  , helpers = require('./../helpers');

module.exports = (function (app) {

  app.post('/auth',
    function (request, response) {
      var params = request.body
        , success = helpers.onAuth(response)
        , error = helpers.onAuthError(response);
      if (params.fbAccessToken) return auth.facebook(params.fbAccessToken, success, error);
      if (params.sessionToken) return auth.session(params.sessionToken, success, error);
      return helpers.returnUnauthorized(response);
    }
  )

});
