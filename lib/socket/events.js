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

      redis.smembers((config.session.prefix + ':user:' + user._id + ':city:' + city + ':rooms:open'),
        function (error, ids) {
          return Models.Room.find({city: city, _id: {$in: ids}}).exec(
            function (error, rooms) {
              for (var i=0; i<rooms.length; i++) socket.join(rooms[i]._id);
              return socket.emit('session:rooms', rooms);
            }
          )
        }
      )

      socket.on('room:join',
        function (id) {
          return Models.Room.findOne({_id: id}).exec(
            function (error, room) {
              return redis.sadd((config.session.prefix + ':user:' + user._id + ':city:' + city + ':rooms:open'), id,
                function () {
                  console.log(id);
                  redis.zincrby('city:' + city + ':rooms:online', 1, id,
                    function (error) {
                      console.log(arguments);
                      socket.join(id);
                      return socket.emit('room:joined', room);
                    }
                  );
                }
              );
            }
          )
        }
      )

      socket.on('room:leave',
        function (room) {
          return redis.srem((config.session.prefix + ':user:' + user._id + ':city:' + city + ':rooms:open'), room,
            function () {
              redis.zincrby('city:' + city + ':rooms:online', -1, room,
                function (error) {
                  socket.leave(room);
                  return socket.emit('room:left', room);
                }
              );
            }
          );
        }
      )

      socket.on('room:history',
        function (room) {
          return Models.Message.roomToday(room).populate('user').exec(
            function (error, messages) {
              return redis.get('room:' + room + ':user:' + user._id + ':read',
                function (error, date) {
                  socket.emit('room:history', room, (messages || []), date);
                  return redis.set('room:' + room + ':user:' + user._id + ':read', Date.now());
                }
              );
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

      socket.on('messages:read',
        function (id) {
          return redis.set('room:' + room + ':user:' + user._id + ':read', Date.now());
        }
      )

    }
  )

});
