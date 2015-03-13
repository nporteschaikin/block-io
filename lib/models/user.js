var mongo = require('./../mongo')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema;

module.exports = (function () {

  var User = new Schema({

    facebookId: {
      type: String
    },

    name: {
      type: String
    },

    createdAt: {
      type: Date,
      default: Date.now
    }

  });

  return mongo.model('User', User);

}());
