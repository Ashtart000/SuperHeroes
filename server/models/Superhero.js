'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superhero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Superhero.init({
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    realName: {
      type: DataTypes.STRING,
      field: 'real_name'
    },
    description: DataTypes.TEXT,
    catchPhrase: {
      type: DataTypes.TEXT,
      field: 'catch_phrase'
    },
    imagePath: {
      type: DataTypes.TEXT,
      field: 'image_path'
    }
  }, {
    sequelize,
    modelName: 'Superhero',
    tableName: 'superheroes',
    underscored: true

  });
  return Superhero;
};