var session = require('./../session');

module.exports = (function (sessionToken, success, error) {
  return session.get(sessionToken,
    function (err, id) {
      if (!id || err) return error(err);
      return success(id);
    }
  )
});
