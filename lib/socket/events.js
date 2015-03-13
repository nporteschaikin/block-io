var Models = require('./../models')
  , redis = require('./../redis')
  , config = require('./../config')
  , _ = require('lodash');

module.exports = (function (io, socket) {

  io.on('connection',
    function (socket) {
      var handshake = socket.handshake
        , user = handshake.user
        , query = handshake.query
        , city = query.city;

      redis.smembers((config.session.prefix + 'rooms:open:' + user.idValue + ':' + city),
        function (error, rooms) {
          for (var i=0; i<rooms.length; i++) socket.join(rooms[i]);
          return socket.emit('session:rooms', rooms);
        }
      )

      socket.on('room:join',
        function (room) {
          return redis.sadd((config.session.prefix + 'rooms:open:' + user.idValue + ':' + city), room,
            function () {
              socket.join(room);
              return socket.emit('room:joined', room);
            }
          );
        }
      )

      socket.on('room:leave',
        function (room) {
          return redis.srem((config.session.prefix + 'rooms:open:' + user.idValue + ':' + city), room,
            function () {
              socket.leave(room);
              return socket.emit('room:left', room);
            }
          );
        }
      )

      socket.on('room:history',
        function (room) {
          return Models.Message.roomToday(room).populate('user').exec(
            function (error, messages) {
              socket.emit('room:history', room, (messages || []));
            }
          );
        }
      )

      socket.on('message:send',
        function (object) {
          var room = object.room
            , message = object.message;
          return Models.Message.create({room: room, user: user._id, message: message},
            function (error, message) {
              return io.sockets.in(room)
                .emit('message:sent', room, user, message);
            }
          )
        }
      )

    }
  )

});
