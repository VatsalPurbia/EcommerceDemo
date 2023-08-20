"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = exports.ExceptionHandler = void 0;
const enum_1 = require("../interface/enum");
class ExceptionHandler {
    constructor() { }
    getError() {
        return {
            code: this.getStatusCode(this.status) ||
                enum_1.HttpStatusCode.BAD_REQUEST,
            status: this.status || enum_1.HttpStatusMessage.BAD_REQUEST,
            data: this.data,
        };
    }
    getStatusCode(code) {
        return enum_1.HttpStatusCode[code];
    }
}
exports.ExceptionHandler = ExceptionHandler;
class CustomException extends ExceptionHandler {
    constructor(message, status) {
        super();
        this.data = {
            message: message,
            type: message,
        };
        this.status = status || enum_1.HttpStatusMessage.BAD_REQUEST;
    }
}
exports.CustomException = CustomException;
