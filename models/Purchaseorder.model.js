const {sequelize} = require('../config/db.config');
const {DataTypes} = require('sequelize');
const Purchase = require("./purchase.model");


const PurchaseOrder = sequelize.define('PurchaseOrder', {
    orderNumber: {
      type: DataTypes.STRING,
      defaultValue: () => Math.floor(Math.random() * 1000).toString()
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemdescription:{
      type:DataTypes.TEXT,
      allowNull:false

    },
    image:{
      type:DataTypes.STRING,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    vendor:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendorPhone:{
      type: DataTypes.STRING,
      allowNull: false
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      
    },
    totalAmount:{
      type: DataTypes.FLOAT,
      allowNull: false

    }

    
  });

  
  
  



sequelize.sync().then(()=>{
  console.log("sync data");
}).catch((err)=>{
  console.log(err);
})

module.exports = PurchaseOrder;