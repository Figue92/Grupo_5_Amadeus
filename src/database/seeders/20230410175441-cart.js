'use strict';


const users = require('../../data/usersSeed.js')
/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {
    const cartSeedMapped = users.map(user => {
      return {
        idUser:user.id,
        createdAt:new Date(),
        updatedAt:new Date()
      }
    })

    await queryInterface.bulkInsert('Carts',cartSeedMapped, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Carts', null, {});

  }
};
