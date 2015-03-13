var mongo = require('./../mongo')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema;

module.exports = (function () {

  var Room = new Schema({

    city: {
      type: Schema.ObjectId,
      ref: 'City'
    },

    name: {
      type: String
    },

    description: {
      type: String
    }

  });

  return mongo.model('Room', Room);

}());
