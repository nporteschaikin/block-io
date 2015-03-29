var mongo = require('./../mongo')
  , Room = require('./room')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema;

module.exports = (function () {

  var City = new Schema({

    name: {
      type: String,
      required: 'Name is required!'
    },

    location: {
      type: [Number],
      index: '2dsphere',
      required: 'Location is required!'
    },

    defaultRoom: {
      type: Schema.ObjectId,
      ref: 'Room'
    }

  });

  City.pre('save',
    function (next) {
      if (this.isNew) {
        var room = new Room({name: 'general', cityId: this._id});
        room.set({city: this._id});
        this.set({defaultRoom: room._id});
        return room.save(next);
      }
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
