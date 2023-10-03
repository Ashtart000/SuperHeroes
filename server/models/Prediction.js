'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prediction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Prediction.belongsTo(models.Superhero, {
        foreignKey: 'superheroId'
      })
    }
  }
  Prediction.init({
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Prediction',
    tableName: 'predictions',
    underscored: true
  });
  return Prediction;
};