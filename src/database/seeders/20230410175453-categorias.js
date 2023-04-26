'use strict';

const categoriesJSON = ['Motherboard', 'Memorias Ram', 'Procesadores', 'Accesorios', 'Placas de Video','Gabinetes']
const categories = categoriesJSON.map(category => {
  return {
    nameCategory: category,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Categories', categories, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Categories', null, {});

  }
};
