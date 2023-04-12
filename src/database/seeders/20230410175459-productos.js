'use strict';
const productsJSON = require('../../data/productos.json')
const products = productsJSON.map(({name, price, description, discount, novedad}) => {
  return {
    name : name.trim(),
    price,
    description,
    idCategory: 1,
    idBrand: 1,
    discount,
    novelty: novedad,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Products', products, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Products', null, {});

  }
};
