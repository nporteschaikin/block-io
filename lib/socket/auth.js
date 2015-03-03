var auth = require('./../auth');

module.exports = (function (io) {

  io.set('authorization',
    function (handshake, accept) {
      var query = handshake.query
        , token = query.token;
      if (token) {
        return auth(token)
          .then(
            function (user) {
              handshake.user = user;
              return accept(null, true);
            }
          )
          .catch(
            function (error) {
              return accept(null, false);
            }
          )
      }
      return accept(null, false);
    }
  )

});
