var Models = require('./../models')
  , helpers = require('./../helpers');

module.exports = (function (app) {
  app.get('/cities',
    function (request, response) {
      return Models.City.find()
        .exec(helpers.onCompletion(request, response));
    }
  )

  app.get('/cities/around',
    function (request, response) {
      return Models.City.findNear(request.query.lat, request.query.lng, 30 * 1609.34)
        .exec(helpers.onCompletion(request, response));
    }
  )

  app.post('/cities',
    function (request, response) {
      return Models.City.create(params(request.body),
        helpers.onCompletion(request, response));
    }
  )

  app.get('/cities/:id',
    function (request, response) {
      return Models.City.findOne({_id: request.params.id})
        .populate('defaultRoom rooms')
        .exec(helpers.onCompletion(request, response));
    }
  )

  function params (body) {
    return {
      name: body.name,
      location: [ body.longitude, body.latitude ]
    };
  }

});
