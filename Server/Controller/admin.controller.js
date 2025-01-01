const { userModel } = require("../Model/user.model");

const removeUser = async (req,res)=>{
    try{
        const {name} = req.body
        if(!name){
            res.status(400).send({
                message : "Name required"
            })
        }
        const exist = await userModel.findOne({name})
        if(!exist){
            console.log(exist);
            
            res.status(400).send({
                message : "User does't exist"
            })
        }
        console.log("Deleted");
            const result = await userModel.deleteOne({name})
            return res.status(200).send({message: "deleted", result})
    }catch(err){
        console.log(err);
    }
}

const userList = async (req, res) =>{
    try{
        const result = await userModel.find()
        console.log("Read");
    return res.status(200).send({
        message : "Total Users",
        result
    })
    }catch(err){
        console.log(err);
    }
}

module.exports = {removeUser, userList}