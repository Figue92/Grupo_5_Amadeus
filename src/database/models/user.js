'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Address, {
        foreignKey : 'IdAddress',
        as : 'address'
      });
      User.belongsTo(models.Rol, {
        foreignKey : 'IdRol',
        as : 'rol'
      })
      User.hasMany(models.Order,{
        foreignKey: "idUser",
        as:"orders"
      })
      User.belongsToMany(models.Product,{
        foreignKey: "idUser",
        otherKey: "idProduct",
        through: "Favorites",
        as: "productsFavorites"
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    idRol: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    socialId:  DataTypes.STRING,
    socialProvider:  DataTypes.STRING,
    idAddress: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};