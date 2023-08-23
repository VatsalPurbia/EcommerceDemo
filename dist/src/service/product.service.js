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
exports.productServiceV1 = void 0;
const enum_1 = require("../interface/enum");
const exception_utils_1 = require("../utils/exception.utils");
const product_entity_1 = require("../entity/product.entity");
const product_schema_1 = require("../model/product.schema");
class ProductService {
    constructor() {
        this.AddProduct = (payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, price, description, imageUrl, userID } = payload;
                yield product_entity_1.productE.saveData({
                    title: title,
                    price: price,
                    description: description,
                    imageUrl: imageUrl,
                    userId: userID,
                });
            }
            catch (error) {
                throw error;
            }
        });
        this.EditProducts = (payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, price, description, imageUrl } = payload.body;
                const { productId } = payload.query;
                const ExsistingProduct = product_entity_1.productE.findOne({ _id: productId }, {
                    title: 1,
                    price: 1,
                    description: 1,
                    imageUrl: 1,
                }, {});
                if (!ExsistingProduct) {
                    throw new exception_utils_1.CustomException(enum_1.ExceptionMessage.PRODUCT_NOT_EXSITS, enum_1.HttpStatusMessage.NOT_FOUND);
                }
                else {
                    yield product_entity_1.productE.updateOne({ _id: productId }, {
                        title: title,
                        price: price,
                        description: description,
                        imageUrl: imageUrl,
                    }, {});
                }
            }
            catch (error) {
                throw error;
            }
        });
        this.deleteProduct = (payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = payload;
                if (productId) {
                    const productExsists = yield product_entity_1.productE.findOne({ _id: productId }, { title: 1, price: 1 });
                    if (!productExsists) {
                        throw new exception_utils_1.CustomException(enum_1.ExceptionMessage.PRODUCT_NOT_EXSITS, enum_1.HttpStatusMessage.NOT_FOUND);
                    }
                }
                else {
                    throw new exception_utils_1.CustomException(enum_1.ExceptionMessage.NOT_VALID_PRODUCT_ID, enum_1.HttpStatusMessage.NOT_ACCEPTABLE);
                }
                yield product_entity_1.productE.deleteMany({ _id: productId });
            }
            catch (error) {
                throw error;
            }
        });
        this.GetProducts = (payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, pageSize = 10 } = payload; // Default page and page size if not provided
                const skipCount = (page - 1) * pageSize; // Calculate the number of documents to skip
                const totalProducts = yield product_schema_1.productModel.countDocuments({}); // Get the total count of products
                const products = yield product_schema_1.productModel
                    .find({})
                    .skip(skipCount)
                    .limit(pageSize);
                return {
                    products,
                    totalPages: Math.ceil(totalProducts / pageSize),
                    currentPage: page,
                    pageSize,
                    totalProducts,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.productServiceV1 = new ProductService();
