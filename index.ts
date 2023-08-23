import express,{Express} from 'express'
import {portNumber} from './src/constant/constants'
import { userContext } from './src/constant/constants'
import { userRouter } from './src/routers/router'
import { mongo } from './src/provider/mongo/mongo'
import {utils} from './src/utils/utils'
class App{
    private app!: Express
    private port!: number
    private context!: string
    constructor(){
        this.startApp()
    }
    startApp(){
        this.app=express()
        this.loadGlobalMiddleWare()
        // utils.constructSwaggerSchema
        mongo.initiateMongoConnection
        this.loadRouter()
        this.initServer()
    }
    loadGlobalMiddleWare() {
        this.context=userContext
        this.app.use(express.json())
        this.port=portNumber
    }
    loadRouter() {
        this.app.use(this.context,userRouter.userRouter())
    }
    initServer(){
        this.app.listen(this.port,this.callback)
    }
    private callback = () => {
        console.log(`Server listing on port: ${this.port}`);
    };
}
new App()