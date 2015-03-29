var mongo = require('./../mongo')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema;

module.exports = (function () {

  var User = new Schema({

    facebookId: {
      type: String,
      required: 'Facebook ID is required!'
    },

    name: {
      type: String,
      required: 'Name is required!'
    },

    createdAt: {
      type: Date,
      default: Date.now
    }

  });

  return mongo.model('User', User);

}());
