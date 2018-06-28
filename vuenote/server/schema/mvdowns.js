/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mvdowns', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    test: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'mvdowns'
  });
};
