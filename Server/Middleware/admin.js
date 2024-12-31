const isAdmin = (req,res,next) =>{
    const {role} = req.body
    if(role!="admin"){
        return res.status(400).send({
            message : "Admin Only"
        })
    }
    next()
}
module.exports = {isAdmin}