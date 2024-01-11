const {sequelize} = require('../config/db.config');
const {DataTypes} = require('sequelize');
const Product = require("./product.model");
const SalesOrder = require("./SalesOrder.model");


const Sale = sequelize.define('Sale', {
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
      defaultValue:0,
      validate: {
        isFloat: true,
      },
    },

    ProductId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    salesOrderId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Initially allow null, will be updated after SalesOrder creation
    },
  

  
    
  });

  Sale.belongsTo(Product,{foreignKey: 'ProductId'});
  

  Sale.afterCreate(async (sale)=>{
    try {

      const product = await Product.findOne({where : {productName: sale.productName}});
      if(product){
        product.totalSales += sale.quantity;
        product.quantity -= sale.quantity;
        await product.save(); 
      }
      
      
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
      
    }

  })

  // Sale.afterCreate(async (sale) => {
  //   try {
  //     // Check if salesOrderId and customer are not already set
  //     if (!sale.salesOrderId && !sale.customer) {
  //       // Implement logic to find or create a SalesOrder based on your requirements
  //       const salesOrder = await SalesOrder.create({
  //         customerName: 'Default Customer', // Replace with actual customer information
  //       });
  
  //       // Update the Sale record with the created SalesOrder information
  //       sale.salesOrderId = salesOrder.id;
  //       sale.customer = salesOrder.customerName;
  //       await sale.save();
  //     }
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

  module.exports = Sale;