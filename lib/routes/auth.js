var User = require('./../models').User
  , auth = require('./../auth')
  , utils = require('./../utils');

module.exports = (function (app) {

  app.post('/auth',
    function (request, response) {
      var params = request.body;
      if (params.fbAccessToken) return auth.facebook(params.fbAccessToken, response);
      if (params.sessionToken) return auth.session(params.sessionToken, response);
      return utils.response.unauthorized(response);
    }
  )

});
