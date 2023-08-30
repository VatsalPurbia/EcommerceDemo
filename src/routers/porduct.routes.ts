import { Router} from "express"
import { ProductControllerV1 } from "../controller/productController"
import { getReviewerChatMessages, sendChatToReviewer, sendChatToUser , subscribeToReviewerChatMessages  } from "../amqp/mqttChat";
// import { mqttController } from "../controller/mqtt.controller";

class productRouter{
    private router!: Router;
    constructor(){
        this.router = Router()
    }
    productRouter(){
        this.router.post('/add-cart', ProductControllerV1.addCart)
        this.router.post('/remove-cart', ProductControllerV1.removeFromCart)
        this.router.get('/get-cart' , ProductControllerV1.viewMyCart)
        this.router.post('/place-order',ProductControllerV1.placeOrder)
        this.router.post('/cancel-order',ProductControllerV1.cancelOrder)
        this.router.get('get-order',ProductControllerV1.viewMyOrder)
        this.router.post('/addProduct' , ProductControllerV1.AddProduct)
        this.router.patch('/editProduct' , ProductControllerV1.EditProduct)
        this.router.delete('/deleteProduct' , ProductControllerV1.DelteProduct)
        this.router.get('/get-product',ProductControllerV1.getProduct)
        this.router.post('/chat/reviewer' , sendChatToReviewer)
        this.router.post('/add-review',  ProductControllerV1.Addreview)
        // this.router.post('/get/reviewer/:reviewerid' , subscribeToReviewerChatMessages)
        // this.router.post('/get/user' , subscribeToUserChatMessages)
        
        this.router.post('/chat/user/reply' , sendChatToUser) 
        this.router.post('/testSub/:reviewerId', subscribeToReviewerChatMessages )
        this.router.get('/getmsg' , getReviewerChatMessages)
        return this.router
    }
}

export const productRouterV1 = new productRouter()