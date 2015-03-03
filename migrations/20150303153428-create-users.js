dbm = dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  return db.createTable('users', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    facebookId: 'string',
    name: 'string',
    createdAt: 'datetime',
    updatedAt: 'datetime'
  }, callback);
};

exports.down = function(db, callback) {
  return db.dropTable('users', callback);
};
