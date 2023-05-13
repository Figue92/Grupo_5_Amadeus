'use strict';
const {
  Model
} = require('sequelize');

const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
Product.hasMany(models.ProductImage,{
  as : 'image',
  foreignKey : 'IdProduct',
  onDelete : 'cascade'
})

      Product.belongsTo(models.Category, {
        foreignKey : 'IdCategory',
        as : 'category'
      });

      Product.belongsTo(models.Brand, {
        foreignKey : 'IdBrand',
        as : 'brand'
      });
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