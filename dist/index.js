"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("./src/constant/constants");
const constants_2 = require("./src/constant/constants");
const router_1 = require("./src/routers/router");
const mongo_1 = require("./src/provider/mongo/mongo");
class App {
    constructor() {
        this.callback = () => {
            console.log(`Server listing on port: ${this.port}`);
        };
        this.startApp();
    }
    startApp() {
        this.app = (0, express_1.default)();
        this.loadGlobalMiddleWare();
        mongo_1.mongo.initiateMongoConnection;
        this.loadRouter();
        this.initServer();
    }
    loadGlobalMiddleWare() {
        this.context = constants_2.userContext;
        this.app.use(express_1.default.json());
        this.port = constants_1.portNumber;
    }
    loadRouter() {
        this.app.use(this.context, router_1.userRouter.userRouter());
    }
    initServer() {
        this.app.listen(this.port, this.callback);
    }
}
new App();
