'use strict';

const productsJSON = require('../../data/productos.json')
let images_db = [];
productsJSON.forEach(({id,image}) => {
  images_db = [...images_db,...image.map(image => {
    return {
      name : image,
      idProduct: id,
      createdAt : new Date(),
      updatedAt : new Date()
    }
  })]
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('ProductImages', images_db, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('ProductImages', null, {});

  }
};
