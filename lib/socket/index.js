var log = require('./../log')
  , config = require('./../config')
  , sio = require('socket.io');

module.exports = (function (server) {

  var io = sio.listen(server, { log: (config.env == 'development')});

  require('./auth')(io);
  require('./events')(io);

});
