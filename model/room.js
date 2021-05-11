const { STRING, NUMBER, ARRAY, INTEGER } =  require("sequelize");
const sequlize = require('../database')

const Room = sequlize.define("room",{
    title:{
        type:STRING,
        allowNull:false
    },
    number:{
        type:NUMBER,
        allowNull:false,
        defaultValue:1
    },
    location:{
        type:STRING,
        allowNull:false
    },
    facilities:{
        type:ARRAY,
    },
    rules:{
        type:ARRAY
    },
    photos:{
        type:Buffer
    },
    price:{
        type:INTEGER,
        allowNull:false
    }
})

module.exports = Room;