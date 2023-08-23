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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const enum_1 = require("../interface/enum");
const user_service_1 = require("../service/user.service");
const response_util_1 = require("../utils/response.util");
class UserController {
    constructor() {
        this.home = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send("Wellcome to our website");
        });
        this.signin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = {
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    type: req.body.type,
                };
                let response = yield user_service_1.userService.signinRedis(payload);
                let finalResponse = response_util_1.responseUitls.successResponse({ response }, enum_1.SuccessMessage.Mail_SEND, enum_1.HttpStatusMessage.OK);
                res.status(enum_1.HttpStatusCode.OK).send(finalResponse);
            }
            catch (error) {
                let err = response_util_1.responseUitls.errorResponse(error, enum_1.ExceptionMessage.USER_ALREADY_EXIST);
                res.status(enum_1.HttpStatusCode.BAD_REQUEST).send(err);
            }
        });
        this.signinVerification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                let response = yield user_service_1.userService.signin(payload);
                let finalResponse = response_util_1.responseUitls.successResponse({ response }, enum_1.SuccessMessage.USER_REGISTRATION, enum_1.HttpStatusMessage.CREATED);
                res.send(finalResponse);
            }
            catch (err) {
                let error = response_util_1.responseUitls.errorResponse(err);
                res.send(error);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const reqBody = req.body;
                const reqHeaders = req.headers;
                const payload = {
                    body: reqBody,
                    headers: reqHeaders
                };
                console.log(payload);
                const response = yield user_service_1.userService.login(payload);
                const finalResponce = response_util_1.responseUitls.successResponse(response, enum_1.HttpStatusMessage.ACCEPTED);
                res.status(enum_1.HttpStatusCode.ACCEPTED).send(finalResponce);
            }
            catch (error) {
                res.status(enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).send(response_util_1.responseUitls.errorResponse(error, enum_1.ExceptionMessage.EMAIL_NOT_EXISTS, enum_1.HttpStatusMessage.INTERNAL_SERVER_ERROR));
            }
        });
    }
}
exports.userController = new UserController();
