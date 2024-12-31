const env = require("dotenv");
const { cartModel } = require("../Model/cart.model");

env.config()
const addToCart = (req,res) =>{
    try{
        const {id, title} = req.body
        const result = cartModel.create({id, title})
        console.log("Added");
        return res.status(201).send({message: "Added to cart",result})
    }
    catch(err){
        console.log(err);
    }
}

const removeFromCart = async (req, res) =>{
    try{
        const {id} = req.query
        if(!id){
            res.status(400).send({
                message : "Id doesn't exist"
            })
        }
        const exist = await cartModel.findOne({id})
        if(!exist){
            console.log(exist);
            
            res.status(400).send({
                message : "Id doesn't exist"
            })
        }
        console.log("Deleted");
        
            const result = await cartModel.deleteOne({id})
            return res.status(200).send({message: "deleted", result})
    }
    catch(err){
        console.log(err)
    }
}

const readCart = async (req, res) =>{
    try{
        const result = await cartModel.find()
        console.log("Read");
    return res.status(200).send({
        message : "Products in database",
        result
    })
    }catch(err){
        console.log(err);
    }
}

const updateCart = async (req,res) =>{
    try{
        const {id, qty} = req.body
        if(!id){
            res.status(400).send({
                message : "Id Required"
            })
        }
        const exist = await cartModel.findOne({id})
        if(!exist){
            console.log(exist);
            
            res.status(400).send({
                message : "Id doesn't exist"
            })
        }
        // console.log("Update");
        
            const result = await cartModel.updateOne({id},{$set : {qty}})
            return res.status(200).send({message: "Quantity Updated", result})
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = {addToCart, removeFromCart, readCart, updateCart}