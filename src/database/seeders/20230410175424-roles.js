'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Rols', [
      {
        nameRol: 'admin',
        CreatedAt: new Date(),
        updatedAt: new Date()
      },
      {
        nameRol: 'user',
        CreatedAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Rols', null, {});

  }
};
