var Models = require('./../models')
  , helpers = require('./../helpers');

module.exports = (function (app) {

  app.post('/rooms',
    function (request, response) {
      return Models.Room.create(params(request.body))
        .complete(helpers.handleCompletion(request, response));
    }
  )

  function params (body) {
    return {
      name: body.name,
      cityId: body.cityId
    }
  }

});
