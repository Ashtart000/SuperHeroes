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
      Film.belongsToMany(models.Superhero, {
        through: 'heroes_to_films',
        foreignKey: 'filmId'
      });
      Film.belongsToMany(models.User, {
        through: 'films_to_users',
        foreignKey: 'filmId'
      });
    }
  }
  Film.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    director: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Film',
    tableName: 'films',
    underscored: true
  });
  return Film;
};