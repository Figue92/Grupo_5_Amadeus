'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {

    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'idUser',
        as: 'user'
      }),
        Order.belongsToMany(models.Product, {
          foreignKey: "idOrder",
          through: 'Cart',
          otherKey: "idProduct",
          as: "cart"
        })
    }
  }
  Order.init({
    date: { type: DataTypes.DATE, defaultValue: new Date() },
    total: { type: DataTypes.INTEGER, defaultValue: 0 },
    idUser: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
      validate: {
        isIn: {
          args: [["pending", "completed", "canceled"]],
          msg: 'Los valores válidos son ["pending", "completed" , "canceled"]'
        }
      }
    },
  },
    {
      sequelize,
      modelName: 'Order',
    },
  )

  return Order;
};