const {Sequelize} = require('sequelize');
require('dotenv').config();

const Db = process.env.DATABASE;
const Root = process.env.ROOT;
const Password = process.env.PASSWORD;
const Dialect = process.env.DIALECT;
const Host = process.env.HOST;


const sequelize = new Sequelize(
    Db,
    Root,
    Password,{
        dialect: Dialect,
        host: Host,
        // pool: {
        //     max: 5,
        //     min: 0,
        //     acquire: 30000,
        //     idle: 10000
        //   },
    }
   
    
);

const ConnectDb = async ()=>{
    try {

        await sequelize.authenticate();
        console.log(" 🔥 Successfully connect to our Db");
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {sequelize, ConnectDb}