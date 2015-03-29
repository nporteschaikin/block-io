var bodyParser = require('body-parser')
  , morgan = require('morgan');

module.exports = (function (app) {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(morgan('dev'));
  app.use(
    function (request, response, next) {
      response.header('Access-Control-Allow-Origin', '*');
      next();
    }
  );

});
