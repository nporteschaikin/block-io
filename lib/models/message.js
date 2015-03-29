var mongo = require('./../mongo')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema;

module.exports = (function () {

  var Message = new Schema({

    room: {
      type: Schema.ObjectId,
      ref: 'Room',
      required: 'Room is required!'
    },

    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: 'User is required!'
    },

    message: {
      type: String,
      required: 'Message is required!'
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
