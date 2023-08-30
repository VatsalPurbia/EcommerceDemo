import { Router} from "express"
import { userController } from "../controller/userController"
import {ProductControllerV1} from "../controller/productController"
class UserRouter{
    private router!:Router
    constructor(){
        this.router=Router()
    }
    userRouter(){
        // User Services
        this.router.get('/home' , userController.home)
        this.router.post('/signup',userController.signin)
        this.router.post('/verify-new-user',userController.signinVerification)
        this.router.post('/login',userController.login)

        return this.router
    }
}
export const userRouter=new UserRouter()