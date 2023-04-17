'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Address, {
        foreignKey : 'IdAddress',
        as : 'address'
      });

      User.belongsTo(models.Rol, {
        foreignKey : 'IdRol',
        as : 'rol'
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
    idAddress: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};