'use strict';

const categoriesJSON = ['Motherboards', 'Memorias RAM', 'Procesadores', 'Accesorios', 'Placas de video']
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
