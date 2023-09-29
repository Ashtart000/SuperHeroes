'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('superimages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imagePath: {
        type: Sequelize.TEXT,
        field: 'image_path'
      },
      superheroId: {
        field: 'superhero_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'superheroes',
            key: 'id'
          }
        }
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
    await queryInterface.dropTable('superimages');
  }
};