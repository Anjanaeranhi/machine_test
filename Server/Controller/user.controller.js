const { userModel } = require("../Model/user.model");
const env = require("dotenv")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

env.config()
const createUser = async (request, response) =>{
    try{
        const data = request.body
        console.log(data);
        const exist =  await userModel.findOne({name: data.name})
        if(exist){
            return response.status(400).send({
                message:"User already exist"
            })
        }
        

        const user = await userModel.create(data)
        data.password = await bcrypt.hash(user.password,10)
        const token = jwt.sign({sub: user}, "sdjdfjkdfnflsfmkzs", {expiresIn:"2d"})
        return response.status(200).send({
            message : "User created",
            user, token
        })
    }
    catch(err){
        console.log(err);
        return response.status(500).send({
            message : "Error at user.controller.js"
        })
    }
}

const loginUser = async (request,response, next) =>{
    try{
        const {name, password} = request.query
        
        const exist = await userModel.findOne({name})
        if(!exist){
            return response.status(404).send("User not found")
        }
        // console.log(email);
        
        // const isPassword = await bcrypt.compare(password, exist.password)
        // const isPassword = await bcrypt.compare(password, exist.password)
        console.log(exist.password);
        console.log(password);
        
        if(password != exist.password){
            return response.status(400).send({
                message : "Wrong passwords"
            })
        }
        
        // if(!isPassword){
        //     return response.status(400).send("Wrong password")
        // }
        return response.status(200).send({message : "Logged in"})
        next()
    }

    catch(err){
        console.log(err);
        return response.status(500).send("Internal Server Error")
    }
}

const userView = async (req,res) =>{
    try{
        const {email} = req.body
        console.log(email);
        
        const result = await userModel.findOne({email})
        console.log("Read");
        return res.status(200).send({
            message : "Details",
            result
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}

const updateUser = async (req,res) =>{
    try{
        const {name, email} = req.body
        if(!email){
            res.status(400).send({
                message : "email Required"
            })
        }
        const exist = await userModel.findOne({email})
        if(!exist){
            console.log(exist);
            res.status(400).send({
                message : "Not Found"
            })
        }
                // console.log("Update");    
        const result = await userModel.updateOne({email},{$set : {name}})
        return res.status(200).send({message: "Name Updated", result})
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}
module.exports = {createUser, loginUser, userView, updateUser}

