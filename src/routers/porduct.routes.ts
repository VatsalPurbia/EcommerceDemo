import { Router} from "express"
import { ProductControllerV1 } from "../controller/productController"
import { getReviewerChatMessages, sendChatToReviewer, sendChatToUser , subscribeToReviewerChatMessages  } from "../amqp/mqttChat";
import { adminSessionCheck } from "../middleware/adminJwt";
import { sessionCheckv1 } from "../middleware/jwtVerification";
// import { mqttController } from "../controller/mqtt.controller";

class productRouter{
    private router!: Router;
    constructor(){
        this.router = Router()
    }
    productRouter(){
        this.router.post('/add-cart',sessionCheckv1.tokenVerification, ProductControllerV1.addCart)
        this.router.post('/remove-cart', ProductControllerV1.removeFromCart)
        this.router.get('/get-cart' , ProductControllerV1.viewMyCart)
        this.router.post('/place-order',sessionCheckv1.tokenVerification,ProductControllerV1.placeOrder)
        this.router.post('/cancel-order',ProductControllerV1.cancelOrder)
        this.router.get('get-order',ProductControllerV1.viewMyOrder)
        this.router.post('/addProduct' ,adminSessionCheck.tokenVerification, ProductControllerV1.AddProduct)
        this.router.patch('/editProduct' ,adminSessionCheck.tokenVerification, ProductControllerV1.EditProduct)
        this.router.delete('/deleteProduct',adminSessionCheck.tokenVerification , ProductControllerV1.DelteProduct)
        this.router.get('/get-product',ProductControllerV1.getProduct)
        this.router.post('/chat/reviewer',sessionCheckv1.tokenVerification , sendChatToReviewer)
        this.router.post('/add-review',sessionCheckv1.tokenVerification,  ProductControllerV1.Addreview)
        this.router.post('/chat/user/reply',sessionCheckv1.tokenVerification , sendChatToUser) 
        this.router.post('/subReview/:reviewerId',sessionCheckv1.tokenVerification, subscribeToReviewerChatMessages )
        this.router.get('/getmsg' , getReviewerChatMessages)
        return this.router
    }
}

export const productRouterV1 = new productRouter()