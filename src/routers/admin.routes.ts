import { Router} from "express"
import { adminControllerV1 } from "../controller/adminController"

class adminRouter {
    private router!:Router
    constructor(){
        this.router = Router()
    }
    adminrouter(){
        this.router.get('/home' , adminControllerV1.home)
        this.router.post('/login' , adminControllerV1.login)
        this.router.post('/otp-verify',adminControllerV1.otpVerify)
        return this.router
    }
}

export const adminRouterV1 = new adminRouter()