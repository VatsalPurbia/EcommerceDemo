"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const mongo_1 = require("../provider/mongo/mongo");
const enum_1 = require("../interface/enum");
const AddessSchema = new mongoose_1.Schema({
    city: String,
    street: String,
    description: String
});
const userSchema = new mongoose_1.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    mobile: Number,
    type: { type: String, enum: enum_1.USER_TYPE },
    address: [AddessSchema]
});
exports.userModel = mongo_1.mongo.getConnection().model(enum_1.COLLECTION.USER, userSchema);
