/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    pwd: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'test'
  });
};
