'use strict';

const productsJSON = require('../../data/productos.json')
const marcas = productsJSON.map(producto => {
  return producto.marca
})


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Brands', [{
      name: 'John Doe',
      isBetaMember: false
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Brands', null, {});

  }
};
