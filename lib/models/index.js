var config = require('./../config').database
  , Sequelize = require('sequelize');

module.exports = (function () {

  var sequelize = (function () {
    if (config.url) {
      return new Sequelize(config.url, config.options);
    }
    return new Sequelize(config.database, config.username, config.password, config.options);
  }());

  var User = require('./user')(sequelize, Sequelize);
  var Message = require('./message')(sequelize, Sequelize);
  var Room = require('./room')(sequelize, Sequelize);
  var City = require('./city')(sequelize, Sequelize);

  User.hasMany(Message, {
    foreignKey: 'userId',
    as: 'messages'
  });

  Message.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });

  Room.hasMany(Message, {
    foreignKey: 'roomId',
    as: 'messages'
  });

  Message.belongsTo(Room, {
    foreignKey: 'roomId',
    as: 'room'
  });

  Room.belongsTo(City, {
    foreignKey: 'cityId',
    as: 'city'
  });

  City.hasMany(Room, {
    foreignKey: 'cityId',
    as: 'rooms'
  });

  City.belongsTo(Room, {
    foreignKey: 'defaultRoomId',
    as: 'defaultRoom'
  });

  City.hook('afterCreate',
    function (city) {
      return city.createDefaultRoom({
        name: 'general',
        cityId: city.id
      });
    }
  )

  return {
    User: User,
    Message: Message,
    City: City,
    Room: Room
  };

}());
