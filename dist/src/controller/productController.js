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
exports.ProductControllerV1 = void 0;
const response_util_1 = require("../utils/response.util");
const enum_1 = require("../interface/enum");
const dotenv_1 = __importDefault(require("dotenv"));
const product_service_1 = require("../service/product.service");
dotenv_1.default.config();
class productController {
    constructor() {
        this.AddProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                let response = yield product_service_1.productServiceV1.AddProduct(payload);
                let finalResponce = response_util_1.responseUitls.successResponse({ response }, enum_1.SuccessMessage.PRODUCT_CREATED, enum_1.HttpStatusMessage.OK);
                res.status(enum_1.HttpStatusCode.ACCEPTED).send(finalResponce);
            }
            catch (error) {
                let err = response_util_1.responseUitls.errorResponse(error, enum_1.ExceptionMessage.SOMETHING_WENT_WRONG);
                res.status(enum_1.HttpStatusCode.BAD_REQUEST).send(err);
            }
        });
        this.EditProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = {
                    body: req.body,
                    query: req.query
                };
                let response = yield product_service_1.productServiceV1.EditProducts(payload);
                let finalResponce = response_util_1.responseUitls.successResponse({ response }, enum_1.SuccessMessage.PRODUCT_EDITED, enum_1.HttpStatusMessage.OK);
                res.status(enum_1.HttpStatusCode.ACCEPTED).send(finalResponce);
            }
            catch (error) {
                let err = response_util_1.responseUitls.errorResponse(error, enum_1.ExceptionMessage.SOMETHING_WENT_WRONG);
                res.status(enum_1.HttpStatusCode.BAD_REQUEST).send(err);
            }
        });
        this.DelteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.query;
                let response = yield product_service_1.productServiceV1.deleteProduct(payload);
                let finalResponce = response_util_1.responseUitls.successResponse({ response }, enum_1.SuccessMessage.PRODUCT_DELETED, enum_1.HttpStatusMessage.OK);
                res.status(enum_1.HttpStatusCode.OK).send(finalResponce);
            }
            catch (error) {
                let err = response_util_1.responseUitls.errorResponse(error, enum_1.ExceptionMessage.SOMETHING_WENT_WRONG);
                res.status(enum_1.HttpStatusCode.BAD_REQUEST).send(err);
            }
        });
        this.getProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.query;
                let response = yield product_service_1.productServiceV1.GetProducts(payload);
                let finalResponce = response_util_1.responseUitls.successResponse({ response }, enum_1.SuccessMessage.ALL_PRODUCTS, enum_1.HttpStatusMessage.OK);
                res.status(enum_1.HttpStatusCode.OK).send(finalResponce);
            }
            catch (error) {
                let err = response_util_1.responseUitls.errorResponse(error, enum_1.ExceptionMessage.SOMETHING_WENT_WRONG);
                res.status(enum_1.HttpStatusCode.BAD_REQUEST).send(err);
            }
        });
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
        });
    }
}
exports.ProductControllerV1 = new productController();
