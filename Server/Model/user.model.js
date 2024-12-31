const {Schema, model} = require("mongoose")

const schema = new Schema({
    name : {type: String, required : [true, "Name required"]},
    email : {type: String, required :[true, "email required"], unique :[true]},
    password : {type: String, required : [true, "password required"]},
    role :{type: String, default: "user", enum: ["user", "admin"]}
}, {timestamps : true})

const userModel = model("Users", schema)

module.exports = {userModel}

// const { Schema, model } = require("mongoose")

// const passwordList = new Schema({
//     password : {type: String, required : true}
// },{
//     timestamps : true
// })

// const pass = model("Password_collection", passwordList);
// module.exports = {pass}