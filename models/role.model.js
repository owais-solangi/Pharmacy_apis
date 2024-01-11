// const {sequelize} = require('../config/db.config');
// const {DataTypes} = require('sequelize');
// const User = require("../models/user.model");

// models/role.model.js
const { sequelize } = require('../config/db.config');
const { DataTypes } = require('sequelize');
const User = require('./user.model');
// const User = require('./user.model');



const Role = sequelize.define('Role', {
  roleName: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  username:{
    type:DataTypes.STRING,

    allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false
  },
  image:{
    type:DataTypes.STRING,
    allowNull:true
  }


  
});

// User.belongsTo(Role, {foreignKey: "RoleId"});
// Role.hasMany(User);




// Role model with User association
// Role.hasMany(User, { foreignKey: 'RoleId' });
// User.belongsTo(Role, { foreignKey: 'RoleId' })

// Role.afterCreate(async (RolesId)=>{
//   try {
//     // Update the associated salesOrderId in all related Sales
//     const roles = await User.update({ RoleId: RolesId.id }, { where: { RoleId: null } });
//     console.log(`${roles[0]} roles updated with RoleId ${ RolesId.id}`);
//   } catch (error) {
//     console.log(error);
//     throw new Error(error.message);
//   }
// })


 

sequelize.sync().then(() => {
  console.log("Schema updated successfully.");
}).catch((err) => {
  console.log(err);
});

module.exports = Role;


// const Role = sequelize.define('Role',{
//     RoleName:{
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique:true
//     }
// })

// Role.hasMany(User);

// module.exports = Role;