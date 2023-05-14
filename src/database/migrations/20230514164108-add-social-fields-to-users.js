'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.addColumn('users', 'socialId', { 
      type:Sequelize.STRING
      });
      await queryInterface.addColumn('users', 'socialProvider', { 
        type:Sequelize.STRING
        });
     
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.removeColumn('users', 'socialId');
      await queryInterface.removeColumn('users', 'socialProvider');
     
  }
};
