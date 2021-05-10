const {Sequelize} = require("sequelize");

const sequlize = new Sequelize("new_schema","root",process.env.PASSWORD,{
    dialect:"mysql",
    host:"localhost",
})

module.exports = sequlize;
