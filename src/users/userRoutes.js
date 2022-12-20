const { Router } = require("express")
const {createUser, readUser, updateUser, deleteUser, loginUser} = require("./userControllers")
const { hashPass, comparePass, tokenCheck } = require('../middleware')

const userRouter = Router()

userRouter.post("/createUser", hashPass, createUser)
userRouter.post("/login",comparePass, loginUser)
userRouter.get("/readUser",tokenCheck, readUser)  // protected endpoint
userRouter.put("/updateUser", updateUser)
userRouter.delete("/deleteUser", deleteUser)


module.exports = userRouter;