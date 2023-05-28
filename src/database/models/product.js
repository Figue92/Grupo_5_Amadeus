'use strict';
const { Model } = require('sequelize');

const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {

      Product.hasMany(models.ProductImage, {
        as: 'image',
        foreignKey: 'idProduct',
        onDelete: 'cascade'
      })
      Product.belongsTo(models.Category, {
        foreignKey: 'idCategory',
        as: 'category'
      });

      Product.belongsTo(models.Brand, {
        foreignKey: 'idBrand',
        as: 'brand'
      });
      Product.belongsToMany(models.Order, {
        through: 'Cart',
        foreignKey: "idProduct",
        otherKey: "idOrder",
        as: "cart"
      })
      Product.belongsToMany(models.User,{
        foreignKey: "idProduct",
        otherKey: "idUser",
        through: "Favorites",
        as: "usersFavorites"
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    idCategory: DataTypes.INTEGER,
    idBrand: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    novelty: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  sequelizePaginate.paginate(Product)
  return Product;
};