const express = require("express")
const cors = require("cors")
const { userRouter } = require("./Route/user.route")
const { connect_Db } = require("./Config/db.config")
const { adminRouter } = require("./Route/admin.route")

const app = express()

app.use(express.json())

app.use(cors())

connect_Db()

app.use("/user",userRouter)
app.use("/admin", adminRouter)


app.listen(8080, (err)=>{
    if(err){
        console.log(err);
        process.exit(1)
    }
    console.log("Running in port 8080................");
    
})


// const express = require("express")
// const { useRouter } = require("./Route/user.route")
// // const mongoose = require("mongoose")
// const config = require("./Config/db")

// config.connectdb()
// const app = express()

// app.use(express.json())

// //  const hello = mongoose.connect('mongodb://localhost:27017',{ dbName:"sample1_db"})
// app.use("/", useRouter)
// app.listen(8080, (err)=>{
//     if(err){
//         process.exit(1)
//     }
//     console.log("Running in port 8080");   
// })