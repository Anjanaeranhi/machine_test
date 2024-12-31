const {connect} = require("mongoose")
const env = require("dotenv")

env.config()
const connect_Db = async () =>{
    try{
        const {connection} = await connect(process.env.CLOUD_URL,{
            dbName: "Users"
        })
        console.log("Connected to", connection.db.databaseName);
    }
    catch(err){
        console.log('Error at db.config.js', err);
        
    }
}

module.exports = {connect_Db}
