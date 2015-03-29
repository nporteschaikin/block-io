var utils = require('./../utils');

module.exports = (function (sessionToken, authCallback, onError) {
  return utils.session.get(sessionToken,
    function (err, id) {
      if (!id || err) return onError(err);
      return authCallback(id);
    }
  )
});
