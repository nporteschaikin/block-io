var config = require('./../config').facebook
  , OAuth2 = require('oauth').OAuth2;

module.exports = (function (accessToken, authCallback, onError) {
  var oauth = new OAuth2(config.clientID, config.clientSecret)
    , attrs = {}
    , attributes;
  return oauth.get('https://graph.facebook.com/me', accessToken,
    function (err, body) {
      if (!!err) return onError(err);
      attributes = JSON.parse(body);
      attrs.facebookId = attributes.id;
      attrs.name = attributes.name;
      return authCallback({facebookId: attributes.id}, attrs);
    }
  );
});
