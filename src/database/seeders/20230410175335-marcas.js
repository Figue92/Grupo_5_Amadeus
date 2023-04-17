'use strict';

const brandsJSON = ["Gigabyte", "Intel", "Adata", "AMD", "Redragon", "Logitech", "GeForce", "HyperX"]
const brands = brandsJSON.map(brand => {
  return {
    name: brand,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Brands', brands, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Brands', null, {});

  }
};
