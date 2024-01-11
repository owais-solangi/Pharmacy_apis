const {sequelize} = require('../config/db.config');
const {DataTypes} = require('sequelize');
const Product = require("./product.model");
const PurchaseOrder = require('./Purchaseorder.model');

const Purchase = sequelize.define('Purchase', {
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

   
  
  });

  
  Purchase.belongsTo(PurchaseOrder, { foreignKey: 'PurchaseOrderId' });  
  PurchaseOrder.hasMany(Purchase, { foreignKey: 'PurchaseOrderId' } );
  

  // Purchase.hasMany(Product);
  sequelize.sync().then(()=>{
    console.log("sync data");
  }).catch((err)=>{
    console.log(err);
  })
 

  module.exports = Purchase;