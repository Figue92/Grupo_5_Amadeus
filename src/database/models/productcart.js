'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductCart.init({
    idProduct: DataTypes.INTEGER,
    idCart: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductCart',
  });
  return ProductCart;
};