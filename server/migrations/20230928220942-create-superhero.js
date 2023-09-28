'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('superheroes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      realName: {
        type: Sequelize.STRING,
        field: 'real_name'
      },
      description: {
        type: Sequelize.TEXT
      },
      catchPhrase: {
        type: Sequelize.TEXT,
        field: 'catch_phrase'
      },
      imagePath: {
        type: Sequelize.TEXT,
        field: 'image_path'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('superheroes');
  }
};