"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntity = void 0;
const user_schema_1 = require("../model/user.schema");
const base_mongo_entity_1 = __importDefault(require("./base-mongo-entity"));
class UserEntity extends base_mongo_entity_1.default {
    constructor() {
        super(user_schema_1.userModel);
    }
}
exports.userEntity = new UserEntity();
