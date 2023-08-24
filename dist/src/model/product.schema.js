"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = require("mongoose");
const mongo_1 = require("../provider/mongo/mongo");
const enum_1 = require("../interface/enum");
const productSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
}, {
    timestamps: true,
});
exports.productModel = mongo_1.mongo
    .getConnection()
    .model(enum_1.COLLECTION.PRODUCT, productSchema);
