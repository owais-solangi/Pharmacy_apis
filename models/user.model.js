// const {sequelize} = require('../config/db.config');
// const {DataTypes} = require('sequelize');
// const Role = require("./role.model");

// models/user.model.js
const { sequelize } = require('../config/db.config');
const { DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
// const Role = require('./role.model');

const User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  
  },

  roleName:{
    type:DataTypes.STRING,
    allowNull:false
  },
  image:{
    type:DataTypes.STRING,
    allowNull:true
  }
});

// User model with Role association




// User.beforeCreate(async (user, options) => {
//   try {
//     console.log('Before create hook is running...');
//     const userRole = await Role.findOne({ where: { RoleName: 'user' } });

//     if (!userRole) {
//       console.log('Role not found');
//       throw new Error('Role not found');
//     }

//     user.RoleId = userRole.id;
//   } catch (error) {
//     console.error(error);
//     throw new Error(error.message);
//   }
// });

// User.beforeCreate(async (user, options) => {
//   try {
//     const [createdRole, role] = await Role.findOrCreate({
//       where: { RoleName: user.RoleName },
//       defaults: {
//         Username:`${user.firstname} ${user.lastname}`,
//         email: user.email
//       }
//     });
//     console.log(createdRole);

//     user.RoleId = role.id;
//   } catch (error) {
//     console.error(error);
//     throw new Error(error.message);
//   }
// });



  // Drop tables after removing the constraint
  sequelize.sync().then(() => {
    console.log("Tables dropped and re-created successfully.");
  }).catch((err) => {
    console.log(err);
  });



module.exports = User;



// const User = sequelize.define("User",{

//     firstname : {
//         type : DataTypes.STRING,
//         allowNull : false,
//         validate : {
//             notEmpty:true
//         }
//     },
//     lastname:{
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate:{
//             notEmpty: true
//         }
//     },
//     phone:{
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true

//     },
//     email:{
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//           isEmail: true,
//         },
//     },
//     password:{
//     type: DataTypes.STRING,
//     allowNull: false,
//     },
//     image: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         validate:{
//             isUrl:true
//         }
//       },
        
// });

// User.belongsTo(Role, {as: "Role"});

// module.exports = User;