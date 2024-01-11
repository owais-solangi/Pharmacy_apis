const {sequelize} = require('../config/db.config');
const {DataTypes, Sequelize} = require('sequelize');
const Sale = require("./sales.model");


const SalesOrder = sequelize.define('SalesOrder', {
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isFloat: true,
      },
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  SalesOrder.hasMany(Sale, {foreignKey:'salesOrderId'});

  // SalesOrder.afterCreate(async (salesOrder) => {
  //   try {
  //     // Update the associated salesOrderId in all related Sales
  //     const sales = await Sale.create({
  //       productName: salesOrder.productName,
  //       quantity: salesOrder.quantity,
  //       price: salesOrder.price,
  //       totalAmount: salesOrder.totalAmount,
  //       salesOrderId: salesOrder.id,
  //     });
  
  //     console.log(`${sales.productName} sale created for SalesOrder ${sales.salesOrderId}`);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(error.message);
  //   }
  // });

  sequelize.sync().then(()=>{
    console.log("sync data");
  }).catch((err)=>{
    console.log(err);
  })
  
module.exports = SalesOrder;