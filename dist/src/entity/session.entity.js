"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionEntity = void 0;
const session_schema_1 = require("../model/session.schema");
const base_mongo_entity_1 = __importDefault(require("./base-mongo-entity"));
class SessionEntity extends base_mongo_entity_1.default {
    constructor() {
        super(session_schema_1.sessionModel);
    }
}
exports.sessionEntity = new SessionEntity();
