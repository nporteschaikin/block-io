var mongo = require('./../mongo')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema;

module.exports = (function () {

  var Room = new Schema({

    name: {
      type: String
    },

    city: {
      type: Schema.ObjectId,
      ref: 'City',
      required: 'City is required!'
    },

    description: {
      type: String
    },

    createdAt: {
      type: Date,
      default: Date.now
    }

  });

  Room.path('name').validate(
    function (name) {
      return /^[a-zA-Z0-9_]{3,16}$/.test(name);
    }, 'Invalid name!'
  )

  Room.index({name: 'text'});

  return mongo.model('Room', Room);

}());
