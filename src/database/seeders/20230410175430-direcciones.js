'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Addresses', [
      {
        address: 'Irigoyen 526',
        city: 'Lanús',
        province: 'Buenos Aires',
        country: 'Argentina',
        zipCode: 1824,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        address: 'Sarmiento 1282',
        city: 'Rafael Calzada',
        province: 'Buenos Aires',
        country: 'Argentina',
        zipCode: 1847,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Addresses', null, {});

  }
};
