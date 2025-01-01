const {Router} = require("express")
const { removeUser, userList } = require("../Controller/admin.controller")
const adminRouter = Router()

adminRouter.delete("/remove",removeUser)
adminRouter.get("/list", userList)

module.exports = {adminRouter}
