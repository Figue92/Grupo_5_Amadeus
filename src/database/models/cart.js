'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // define association here
    }
  }
  Cart.init({
    quantity:{
      type: DataTypes.INTEGER,
      defaultValue: 1
    } ,
    idProduct: DataTypes.INTEGER,
    idOrder: DataTypes.INTEGER,
   
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};