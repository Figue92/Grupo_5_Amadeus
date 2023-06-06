'use strict';

const usersJSON = require('../../data/users.json')
const rolsJSON = [{nameRol: "admin",id:1},{nameRol: "user",id:2}]
const users = usersJSON.map(({ name, surname, email, phone, rol }) => {

  return {
    name: name.trim(),
    surname: surname.trim(),
    email,
    phone,
    idRol: rolsJSON.find(b => b.rolName === rol)?.id || 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
})


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', users, {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
