var config = require('../.configrc')
  , _ = require('lodash');

module.exports = (function () {

  var conf = (config.base || {})
    , env = (process.env.NODE_ENV || 'development');

  config = config || {};
  if (config[env]) conf = _.merge(conf, config[env]);

  conf.env = env;

  return conf;

}());
