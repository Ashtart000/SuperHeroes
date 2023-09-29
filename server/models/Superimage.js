'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superimage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Superimage.belongsTo(models.Superhero, {
        foreignKey: 'superheroId'
      })
    }
  }
  Superimage.init({
    imagePath: {
      type: DataTypes.TEXT,
      field: 'image_path'
    }
  }, {
    sequelize,
    modelName: 'Superimage',
    tableName: 'superimages'
  });
  return Superimage;
};