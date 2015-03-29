var config = require('./config').redis
  , redis = require('redis')
  , url = require('url');

module.exports = (function () {

  var host
    , port
    , auth
    , client
    , u;

  if (config.url) {
    u = url.parse(config.url);
    host = u.hostname;
    port = u.port;
    auth = u.auth;
  } else {
    host = config.host;
    port = config.port;
  }

  client = redis.createClient(port, host);
  if (auth) client.auth(auth.split(':')[1]);
  return client;


}());
