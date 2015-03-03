var config = require('./../config').facebook
  , OAuth2 = require('oauth').OAuth2;

module.exports = (function (accessToken, success, error) {
  var oauth = new OAuth2(config.clientID, config.clientSecret)
    , attrs = {}
    , attributes;
  return oauth.get('https://graph.facebook.com/me', accessToken,
    function (err, body) {
      if (!!err) return error(err);
      attributes = JSON.parse(body);
      attrs.facebookId = attributes.id;
      attrs.name = attributes.name;
      return success({facebookId: attributes.id}, attrs);
    }
  );
});
