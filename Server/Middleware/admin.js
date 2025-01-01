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
        // console.log("Problem is here!!!!!!!!!!!!!");
        
        if(!tokenData){
            return res.status(400).send({
                message : " Token not found"
            })
        }
        const [bearer, token] = tokenData?.split(" ")
        console.log(bearer);
        
        console.log("Token is here",token)
        if(!token){
            return res.status(400).send({
                message : "Not found"
            })
        }
        console.log("Hello");
        
        const response = jwt.verify(token, "sdjdfjkdfnflsfmkzs" )
        console.log(response);
        
        const currentTime = Math.floor(new Date().getTime() / 1000)
        if (response.exp <= currentTime) {
            return res.status(401).send({
                message: "Unauthorized"
            })
        }
        next()    
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            message: "Internal server error"
        })
    }
    
}


module.exports = {isAdmin, Auth}