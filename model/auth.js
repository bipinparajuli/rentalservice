const {Sequelize, INTEGER, STRING} = require("sequelize");

const sequelize = require("../database");

const User = sequelize.define("user",{ 

    u_id:{
        type:INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },

    fname:{
        type:STRING,
        allowNull:false
    },
    lname:{
        type:STRING,
        allowNull:false
    },
    email:{
        type:STRING,
        allowNull:false
    },
    phone_no:{
        type:STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:STRING,
        allowNull:false,
        
    },
    location:{
        type:STRING,
        allowNull:false
    }

})

module.exports = User;