'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Film.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isYearAdequate(value) {
          if (value < 1900 || value > 2025) {
            throw new Error('Year is not correct')
          }
        }
      }
    },
    country: DataTypes.STRING,
    imagePath: {
      type: DataTypes.TEXT,
      field: 'image_path'
    },
    description: DataTypes.TEXT,
    producer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Film',
    tableName: 'films'
  });
  return Film;
};