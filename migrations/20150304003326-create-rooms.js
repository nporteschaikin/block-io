dbm = dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  return db.createTable('rooms', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    cityId: {
      type: 'int',
      unsigned: true,
      foreignKey: {
        table: 'cities',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    name: 'string',
    description: 'string',
    createdAt: 'datetime'
  }, callback);
};

exports.down = function(db, callback) {
  return db.dropTable('rooms', callback);
};
