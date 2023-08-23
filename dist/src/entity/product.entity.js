"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productE = void 0;
const product_schema_1 = require("../model/product.schema");
const base_mongo_entity_1 = __importDefault(require("./base-mongo-entity"));
class productEntity extends base_mongo_entity_1.default {
    constructor() {
        super(product_schema_1.productModel);
    }
}
exports.productE = new productEntity();
