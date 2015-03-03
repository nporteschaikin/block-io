module.exports = (function (sequelize, TYPES) {

  return sequelize.define('User', {

    facebookId: {
      type: TYPES.STRING
    },

    name: {
      type: TYPES.STRING
    }

  }, {

    tableName: 'users'

  });

});
