"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controller/userController");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    userRouter() {
        this.router.post('/signup', userController_1.userController.signin);
        this.router.post('/verify-new-user', userController_1.userController.signinVerification);
        this.router.post('/login', userController_1.userController.login);
        return this.router;
    }
}
exports.userRouter = new UserRouter();
