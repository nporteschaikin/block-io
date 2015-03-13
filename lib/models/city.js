var mongo = require('./../mongo')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema;

module.exports = (function () {

  var City = new Schema({

    name: {
      type: String
    },

    location: {
      type: [Number],
      index: '2dsphere'
    },

    defaultRoom: {
      type: Schema.ObjectId,
      ref: 'Room'
    },

    rooms: [{
      type: Schema.ObjectId,
      ref: 'Room'
    }]

  });

  City.pre('save',
    function (done) {
      var city = this;
      if (!city.isNew) return;
      return mongo.model('Room').create({name: 'general', city: city._id},
        function (error, room) {
          city.set({defaultRoom: room, rooms: [room]});
          done();
        }
      )
    }
  )

  City.statics.findNear = function (latitude, longitude, maxDistance) {
    return this.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: maxDistance
        }
      }
    });
  }

  return mongo.model('City', City);

}());
