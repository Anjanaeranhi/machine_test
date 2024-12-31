const {Router} = require("express")
const { createUser, loginUser } = require("../Controller/user.controller")
const { addToCart, removeFromCart, updateCart, readCart } = require("../Controller/product.controller")
const userRouter = Router()
const {isAdmin} = require("../Middleware/admin")

userRouter.post("/", createUser)
userRouter.get("/", loginUser)
userRouter.post("/cart", addToCart)
userRouter.get("/cart", readCart)
userRouter.patch("/cart", isAdmin , updateCart)
userRouter.delete("/cart", removeFromCart )

module.exports = {userRouter}


// const { Router} = require("express")
// const { createUser, loginUser } = require("../Controller/user.controller")
// const useRouter = Router()

// useRouter.post("/user",createUser)
// useRouter.get("/user",loginUser)

// module.exports = {useRouter}