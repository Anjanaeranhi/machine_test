const {Router} = require("express")
const { createUser, loginUser, userView, updateUser } = require("../Controller/user.controller")
const { addToCart, removeFromCart, updateCart, readCart } = require("../Controller/product.controller")
const userRouter = Router()
const {isAdmin, Auth} = require("../Middleware/admin")

userRouter.post("/", createUser)
userRouter.get("/", loginUser)
userRouter.get("/view",Auth, userView)
userRouter.patch("/update" , Auth, updateUser)
userRouter.post("/cart",Auth,isAdmin, addToCart)
userRouter.get("/cart", readCart)
userRouter.patch("/cart", isAdmin , updateCart)
userRouter.delete("/cart",isAdmin , removeFromCart )

module.exports = {userRouter}
