module.exports = (function (sequelize, TYPES) {

  return sequelize.define('Room', {

    name: {
      type: TYPES.TEXT
    }

  }, {

    tableName: 'rooms',

    timestamps: true,
    updatedAt: false,

    defaultScope: {
      order: ['name asc']
    }

  });

});
