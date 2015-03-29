var config = require('./config')
  , log = require('./log')
  , http = require('http')
  , express = require('express');

module.exports = (function () {

  return function (port, callback) {

    var app = express()
      , server = http.createServer(app);

    require('./app')(app);
    require('./routes')(app);
    require('./socket')(server);

    return server.listen(port,
      function () {
        log('Server started at port ' + port + '.');
        if ('function' === typeof callback) return callback(error, port);
      }
    );
    
  }

}());
