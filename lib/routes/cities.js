var Models = require('./../models')
  , session = require('./../session')
  , middleware = require('./../middleware')
  , helpers = require('./../helpers');

module.exports = (function (app) {
  app.get('/cities',
    function (request, response) {
      return Models.City
        .findAll()
        .complete(helpers.onCompletion(request, response));
    }
  )

  app.get('/cities/around',
    function (request, response) {
      return Models.City.scope({method: ['around', request.query.lat, request.query.lng]})
        .findAll()
        .complete(helpers.onCompletion(request, response));
    }
  )

  app.post('/cities',
    function (request, response) {
      return Models.City.create(params(request.body))
        .complete(helpers.onCompletion(request, response));
    }
  )

  app.get('/cities/:id',
    function (request, response) {
      return Models.City.findOne({where: ['id = ?', request.params.id], include: [{model: Models.Room, as: 'rooms'}]})
        .complete(helpers.onCompletion(request, response));
    }
  )

  function params (body) {
    return {
      name: body.name,
      latitude: body.latitude,
      longitude: body.longitude
    };
  }

});
