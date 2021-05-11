require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database")

const AuthRoutes = require("./routes/auth")

const app = express();


//creating a database

sequelize.sync()
.then(()=>console.log("db connected"))
.catch(e=> console.log("error in connection",e))




//middleware
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())


//routes
app.use("/api",AuthRoutes)



app.listen(process.env.PORT||8000,()=>{
    console.log("app is running at port 8000");
})