const user = require("../model/auth")

const bcrypt = require("bcrypt")

const {validationResult} = require('express-validator');

const jwt = require("jsonwebtoken")

const expressJWT = require("express-jwt")


exports.signup = async (req,res) => {

const {email,password,fname,lname,location,phone_no,u_id} = req.body



// const existingUser = await user.findOne({where:{email:email}})



// if(existingUser)
// {
//     res.status(400).json(
//         {
//             success:false,
//             status:400,
//             error:"Email already in use",
//             messege:["API is not working"]
//         }
//         )
// }
// else{
    const error = validationResult(req);

    if(!error.isEmpty())
    {
        return res.status(400).json({
            status:400,
            success:false,
            error:errors.array()[0].msg,
            messege:["API is not working"]
        })
    }

    bcrypt.hash(password,17,(err,password)=>{
if(err)
{
    res.json(
        {
            success:false,
            status:404,
            error:err,
            messege:["Failed in hasing password"]
        }
        )
}

                console.log(fname,lname);


        user.create(
            {
                u_id:u_id,
                fname:fname,
                lname:lname,
                email:email,
                password:password,
                phone_no:phone_no,
                location:location                
            })
        .then( data => 
            {
                data.u_password=undefined
                res.json(
                    {
                        success:true,
                        status:200,
                        data:data,
                        messege:["API is working"]
                    }
                    )

            }
            )
        .catch(data=> res.status(400).json(
            {
                success:false,
                status:400,
                error:data,
                messege:["Signup failed"]
            }
            )
            )
    
    })


}

exports.signin =  (req,res)=>{

    const {email,password} = req.body

    const errors = validationResult(req)


if(!errors.isEmpty())
    {
       return res.status(400).json({
        success:false,status:400,error:errors.array()[0].msg,messege:["API is not working"]
        })
    }


    user.findOne({where:{u_email:email}})
 .then((data)=>
    {
// console.log(data.dataValues.u_password)
        if( !data)
            {
                res.status(403).json(
                    {
                        success:false,
                        status:403,
                        error:"No matching found on db",
                        messege:["API is not working"]
                    }
                    )
            }

            bcrypt.compareS(password,data.dataValues.u_password,(err,result)=>{
                if(err)
                {
                    res.json({success:false,status:403,error:err,messege:["Password don't match"]})
                }

                const token = jwt.sign({name:data.dataValues.u_name},process.env.SECREATE)
                
                res.cookie("token",token)

                const {u_name,u_email,u_id} =data.dataValues

                res.send({success:true,status:200,data:{u_name,u_email,u_id,token},messege:["Successfully signin"]})
            })
    }
    )
 .catch(e=>res.json({success:false,status:403,error:e,messege:["Error while signin"]}))
 
}

exports.isSignedIn = expressJWT({
    secret:process.env.SECREATE,
    userProperty:"auth",
    algorithms:['sha1', 'RS256', 'HS256']
})

exports.signOut = (req,res) => {
res.clearCookie("token");
res.json({messege:"Signout successfully"})
}

exports.isAdmin = (req,res,next) => {

    if(!req.profile.u_role == "1")
    {
        res.status(401).json({success:false,success:401,error:"Acess denied",messege:["API is not working"]})
    }
    next();

}

exports.isAuthenticate = (req,res,next) => {

    // console.log(req.auth,req.profile)

    const check = req.profile && req.auth && req.profile.u_name == req.auth.name

    if(!check)
    {
        res.status(401).json({success:false,status:401,error:"Not an authenticate user",messege:["API is not working"]})

    }

    next();
}