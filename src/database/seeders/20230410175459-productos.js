'use strict';
const productsJSON = require('../../data/productos.json')
const categoriesJSON = [{ name: 'Motherboard', id: 1 }, { name: 'Memorias Ram', id: 2 }, { name: 'Procesadores', id: 3 }, { name: 'Accesorios', id: 4 }, { name: 'Placas de Video', id: 5 },{ name: 'Gabinetes', id: 6 }]
const brandsJSON = [{name:"Gigabyte",id:1},{name:"Intel", id:2} ,{name:"Adata", id:3} ,{name:"AMD", id:4},{name: "Redragon",id:5},{name: "Logitech",id:6},{name: "GeForce",id:7},{name: "HyperX",id:8},{name: "Asus",id:9},{name: "Corsair",id:10}]

const products = productsJSON.map(({ name, price, description, discount, novedad, category,marca }) => {

  return {
    name: name.trim(),
    price,
    description,
    idCategory: categoriesJSON.find(c => c.name === category)?.id || 4,
    idBrand: brandsJSON.find(b => b.name === marca)?.id || 2,
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
