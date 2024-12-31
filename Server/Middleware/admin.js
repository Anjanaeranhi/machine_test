const jwt = require("jsonwebtoken");

const isAdmin = (req,res,next) =>{
    try{
        const {role} = req.body
        if(role!="admin"){
            return res.status(400).send({
                message : "Admin Only"
            })
        }
        next()
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}


const Auth = async (req, res, next) => {
    try {
        const tokenData = req.headers["authorization"]
        console.log(tokenData);
        
        if(!tokenData){
            return res.status(400).send({
                message : " Token not found"
            })
        }
        const [bearer, token] = tokenData?.split(" ")

        if(!bearer|| !token){
            return res.status(400).send({
                message : "Not found"
            })
        }
        const response = jwt.verify(token, "sdjdfjkdfnflsfmkzs" )
        // const currentTime = Math.floor(new Date().getTime() / 1000)
        // if (response.exp <= currentTime) {
        //     return res.status(401).send({
        //         message: "Unauthorized"
        //     })
        // }
        return res.status(400).send({
            message: "Verified",
            response
        })        
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            message: "Internal server error"
        })
    }
    next()
}


module.exports = {isAdmin, Auth}