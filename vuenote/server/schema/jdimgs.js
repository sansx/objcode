/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jdimgs', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    imgsrc: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'jdimgs'
  });
};
