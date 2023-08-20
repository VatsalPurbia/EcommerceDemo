"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongo = void 0;
const mongoose_1 = __importStar(require("mongoose"));
class MongoConnection {
    constructor() {
        this.initiateMongoConnection();
    }
    initiateMongoConnection() {
        if (!this.conn) {
            const options = {};
            this.conn = (0, mongoose_1.createConnection)(this.getConnectionUri(), options);
            this.registerConnectionEvent();
            mongoose_1.default.set('debug', true);
        }
    }
    getConnectionUri() {
        return 'mongodb://localhost:27017';
    }
    registerConnectionEvent() {
        this.conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
        this.conn.once('open', () => {
            console.log('MongoDB connected successfully!,\nconnected to ', this.getConnectionUri());
        });
    }
    getConnection() {
        return this.conn;
    }
}
exports.mongo = new MongoConnection();
