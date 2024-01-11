const {sequelize} = require('../config/db.config');
const {DataTypes} = require('sequelize');
const Purchase = require("./purchase.model");

const Product = sequelize.define('Product', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Product name is required.',
      },
      len: {
        args: [2, 255],
        msg: 'Product name must be between 2 and 255 characters.',
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image:{
    type:DataTypes.STRING,
    allowNull:true

  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Product price is required.',
      },
      isDecimal: {
        msg: 'Product price must be a decimal number.',
      },
      min: {
        args: [0],
        msg: 'Product price cannot be negative.',
      },
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Product quantity is required.',
      },
      isInt: {
        msg: 'Product quantity must be an integer.',
      },
      min: {
        args: [0],
        msg: 'Product quantity cannot be negative.',
      },
    },
  },

  totalSales:{
    type:DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0 
  },

  PurchaseId:{
    type:DataTypes.INTEGER,
    allowNull:true
  }

  
  
});

Product.belongsTo(Purchase , { foreignKey : 'PurchaseId' });




sequelize.sync().then(()=>{
  console.log("sync data");
}).catch((err)=>{
  console.log(err);
})


module.exports = Product;
