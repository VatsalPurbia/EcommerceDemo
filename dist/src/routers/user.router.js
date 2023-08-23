"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const productController_1 = require("../controller/productController");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    userRouter() {
        // User Services
        this.router.get('/home', userController_1.userController.home);
        this.router.post('/signup', userController_1.userController.signin);
        this.router.post('/verify-new-user', userController_1.userController.signinVerification);
        this.router.post('/login', userController_1.userController.login);
        // Product Services 
        this.router.post('/addPost', productController_1.ProductControllerV1.AddProduct);
        this.router.patch('/editPost', productController_1.ProductControllerV1.EditProduct);
        this.router.delete('/deltePost', productController_1.ProductControllerV1.DelteProduct);
        return this.router;
    }
}
exports.userRouter = new UserRouter();
