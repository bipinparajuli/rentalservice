const {Sequelize} = require("sequelize");

const sequlize = new Sequelize({
    dialect:"mysql",
    host:"localhost",
    database:"accesscontrol",
    username:"root",
    port:"3306",
    password:process.env.PASSWORD
})

module.exports = sequlize;
