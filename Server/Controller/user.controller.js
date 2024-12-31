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

const loginUser = async (request,response) =>{
    try{
        const {name, password} = request.query
        const exist = await userModel.findOne({name})
        if(!exist){
            return response.status(404).send("User not found")
        }
        // console.log(email);
        
        // const isPassword = await bcrypt.compare(password, exist.password)
        const isPassword = await bcrypt.compare(password, exist.password)
        console.log(exist.password);
        console.log(password);
        console.log(isPassword);
        
        if(!isPassword){
            return response.status(400).send("Wrong password")
        }
        if(email == "apple@gmail.com"){
            
        }
        return response.status(200).send({message : "Logged in"})
    }

    catch(err){
        console.log(err);
        return response.status(500).send("Internal Server Error")
    }
}

module.exports = {createUser, loginUser}

