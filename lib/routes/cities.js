var Models = require('./../models')
  , redis = require('./../redis')
  , utils = require('./../utils');

module.exports = (function (app) {
  app.get('/cities',
    function (request, response) {
      return Models.City.find()
        .exec(utils.response.onCompletion(response));
    }
  )

  app.get('/cities/around',
    function (request, response) {
      return Models.City.findNear(request.query.lat, request.query.lng, 30 * 1609.34)
        .exec(utils.response.onCompletion(response));
    }
  )

  app.post('/cities',
    function (request, response) {
      return Models.City.create({name: request.body.name, location: [request.body.longitude, request.body.latitude]},
        utils.response.onCompletion(response));
    }
  )

  app.get('/cities/:id',
    function (request, response) {
      return Models.City.findOne({_id: request.params.id})
        .exec(utils.response.onCompletion(response));
    }
  )

  app.post('/cities/:id/rooms',
    function (request, response) {
      return Models.Room.create({name: request.body.name, description: request.body.description, city: request.params.id},
        utils.response.onCompletion(response));
    }
  )

  app.post('/cities/:id/rooms/search',
    function (request, response) {
      return Models.Room.find({name: new RegExp(('^' + request.body.query), 'i')})
        .exec(utils.response.onCompletion(response));
    }
  )

  app.get('/cities/:id/rooms/popular',
    function (request, response) {
      redis.zrange('city:' + request.params.id + ':rooms:online', 0, 4,
        function (err, ids) {
          return Models.Room.find({_id: { $in: ids }})
            .exec(utils.response.onCompletion(response));
        }
      );
    }
  )

});
