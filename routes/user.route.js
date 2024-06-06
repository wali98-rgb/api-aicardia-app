import { Router } from "express"
import { create, findAll, findOne, update, destroy, updatePassword } from "../controllers/user.controller.js"
import authJwt from "../middlewares/authJwt.js"
const userRoute = Router()

userRoute.use(authJwt)
userRoute.get('/', findAll)
userRoute.get('/:id', findOne)
userRoute.post('/', create)
userRoute.put('/:id', update)
userRoute.put('/update-pass/:id', updatePassword)
userRoute.delete('/:id', destroy)

export default userRoute