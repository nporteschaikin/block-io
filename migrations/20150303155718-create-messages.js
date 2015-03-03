dbm = dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  return db.createTable('messages', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: 'int',
      unsigned: true,
      foreignKey: {
        table: 'users',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    roomId: {
      type: 'int',
      unsigned: true,
      foreignKey: {
        table: 'rooms',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    message: 'text',
    createdAt: 'datetime'
  }, callback);
};

exports.down = function(db, callback) {
  return db.dropTable('messages', callback);
};
