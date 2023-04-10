'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Carts', [{
      name: 'John Doe',
      isBetaMember: false
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Carts', null, {});

  }
};
