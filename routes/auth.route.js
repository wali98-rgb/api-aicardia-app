import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import errorHandler from "../middlewares/errorHandler.js";

const authRoute = Router()

authRoute.post('/login', login)
authRoute.post('/register', register)
authRoute.use(errorHandler)

export default authRoute