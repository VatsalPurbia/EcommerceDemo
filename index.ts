import express, { Express } from "express";
import { portNumber } from "./src/constant/constants";
import { userContext, swaggerContext, adminContext } from "./src/constant/constants";
import { userRouter } from "./src/routers/router";
import { adminRouterV1 } from "./src/routers/router";
import { mongo } from "./src/provider/mongo/mongo";
import { serve, setup } from "swagger-ui-express";
import swaggerDocument from "./swagger/parse-swagger.json";
import { utils } from "./src/utils/utils";
class App {
  private app!: Express;
  private port!: number;
  private context!: string;
  private adminContext!: string;
  private swaggerContext!: string;
  constructor() {
    this.startApp();
  }
  startApp() {
    this.app = express();
    this.loadGlobalMiddleWare();
    mongo.initiateMongoConnection;
    this.loadRouter();
    this.initServer();
}
loadGlobalMiddleWare() {
    this.swaggerContext=swaggerContext;
    this.adminContext=adminContext;
    this.context = userContext;
    this.app.use(express.json());
    this.port = portNumber;
  }
  loadRouter() {
    this.app.use(this.swaggerContext, serve, setup(swaggerDocument));
    this.app.use(this.context, userRouter.userRouter());
    this.app.use(this.adminContext ,adminRouterV1.adminrouter());
  }
  initServer() {
    this.app.listen(this.port, this.callback);
  }
  private callback = () => {
    console.log(`Server listing on port: ${this.port}`);
  };
}
(async () => {
  await utils.constructSwaggerSchema();
  new App();
})();
