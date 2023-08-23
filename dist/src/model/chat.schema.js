"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
const mongoose_1 = require("mongoose");
const mongo_1 = require("../provider/mongo/mongo");
const enum_1 = require("../interface/enum");
const ChatSchema = new mongoose_1.Schema({
    praticipentId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    productDetails: {
        productId: mongoose_1.Schema.Types.ObjectId,
        message: String,
        senderId: mongoose_1.Schema.Types.ObjectId,
        messsageContent: String
    },
}, {
    timestamps: true
});
exports.ChatModel = mongo_1.mongo.getConnection().model(enum_1.COLLECTION.CHAT, ChatSchema);
