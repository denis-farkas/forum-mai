import { UserController } from "../controllers/user.controller.js";


import express from "express"


const initUserRoutes = (app) => {
    const router = express.Router()
    router.post("/signUp", UserController.signUp)
    router.post("/signIn", UserController.signIn)
    router.get("/read", UserController.read)
    router.get("/readOneUser", UserController.readOneUser)
    router.put("/updateUser", UserController.updateUser)
    router.get("/test", UserController.test);



    app.use("/api/users", router)
    
}

export default initUserRoutes