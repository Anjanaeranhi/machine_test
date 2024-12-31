const { Schema, model } = require("mongoose");

const schema = new Schema({
    id : {type: String, required : [true, "id required"], unique : true},
    title : {type: String,required : [true, "title required"]},
    description : {type: String, required : [true, "description required"]},
    qty : {type: Number, default: 1}
},{
    timestamps: true
})

const cartModel = model("CartData", schema)
module.exports = {cartModel}