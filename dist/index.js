"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("./src/constant/constants");
const constants_2 = require("./src/constant/constants");
const router_1 = require("./src/routers/router");
const router_2 = require("./src/routers/router");
const mongo_1 = require("./src/provider/mongo/mongo");
const swagger_ui_express_1 = require("swagger-ui-express");
const parse_swagger_json_1 = __importDefault(require("./swagger/parse-swagger.json"));
const utils_1 = require("./src/utils/utils");
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
        this.swaggerContext = constants_2.swaggerContext;
        this.adminContext = constants_2.adminContext;
        this.context = constants_2.userContext;
        this.app.use(express_1.default.json());
        this.port = constants_1.portNumber;
    }
    loadRouter() {
        this.app.use(this.swaggerContext, swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(parse_swagger_json_1.default));
        this.app.use(this.context, router_1.userRouter.userRouter());
        this.app.use(this.adminContext, router_2.adminRouterV1.adminrouter());
    }
    initServer() {
        this.app.listen(this.port, this.callback);
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield utils_1.utils.constructSwaggerSchema();
    new App();
}))();
