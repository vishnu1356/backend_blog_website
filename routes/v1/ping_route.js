
const express = require("express")
const { createUser, getAllUsers, getSingleUser, deleteSingleUser, updateSingleUser, getUserByEmail, forgotPassword, resetPassword } = require("../../controllers/user_controller")
const { isLoggedIn } = require("../../middlewares/auth_validators")


const pingOneRouter = express.Router()



pingOneRouter.get("/users", getAllUsers)
pingOneRouter.post("/user/post", createUser)
pingOneRouter.post("/user/forgot", forgotPassword)
pingOneRouter.post("/user/reset", resetPassword)
pingOneRouter.post("/user/signin",  getUserByEmail)
pingOneRouter.get("/user/:id", getSingleUser)
pingOneRouter.delete("/user/:id", deleteSingleUser)
pingOneRouter.patch("/user/:id", updateSingleUser)
pingOneRouter.get("/ping",  (req, res) => {
    res.send({message: "Ping Check Ok"})
})

module.exports = pingOneRouter;