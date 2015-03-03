module.exports = (function (sequelize, TYPES) {

  return sequelize.define('Message', {

    message: {
      type: TYPES.TEXT
    }

  }, {

    tableName: 'messages',

    timestamps: true,
    updatedAt: false,

    scopes: {
      lastDay: function (roomId) {
        var ago = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
        return {
          where: ['roomId = ? and createdAt < ?', roomId, ago]
        }
      }
    }

  });

});
