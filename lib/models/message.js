var mongo = require('./../mongo')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema;

module.exports = (function () {

  var Message = new Schema({

    room: {
      type: Schema.ObjectId,
      ref: 'Room'
    },

    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },

    message: {
      type: String
    },

    createdAt: {
      type: Date,
      default: Date.now
    }

  });

  Message.statics.roomToday = function (room) {
    var dayAgo = new Date();
    dayAgo.setDate(dayAgo - 1);
    return this.find({
      room: room,
      createdAt: {
        $gt: dayAgo
      }
    }).sort('createdAt');
  }

  return mongo.model('Message', Message);

}());
