dbm = dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  return db.createTable('cities', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    name: 'string',
    latitude: 'float',
    longitude: 'float',
    defaultRoomId: {
      type: 'int',
      unsigned: true,
      foreignKey: {
        table: 'rooms',
        mapping: 'id',
        rules: {
          onDelete: 'SET NULL',
          onUpdate: 'RESTRICT'
        }
      }
    },
    createdAt: 'datetime'
  }, callback);
};

exports.down = function(db, callback) {
  return db.dropTable('cities', callback);
};
