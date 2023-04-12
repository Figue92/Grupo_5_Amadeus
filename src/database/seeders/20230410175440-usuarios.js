'use strict';

const bcryptjs = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        surname: 'test',
        email: 'admin@test.com',
        password: bcryptjs.hashSync('123456', 10),
        phone: "11 23456789",
        idRol: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'user',
        surname: 'test',
        email: 'user@test.com',
        password: bcryptjs.hashSync('123456', 10),
        phone: "11 98765432",
        idRol: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
