"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseUitls = void 0;
const enum_1 = require("../interface/enum");
const enum_2 = require("../interface/enum");
class ResponseUitls {
    /**
     * @description Construct Success Response Object
     * @param {Record<string, AcceptAny>} data Actual Data to be Provided in Response
     * @param {number} status Status Code for Response
     * @param {string} statusMsg Status Msg for Response
     * @returns {HttpResponse} Response Object
     */
    successResponse(data, message = enum_1.HttpStatusMessage.OK, status = enum_1.HttpStatusMessage.OK) {
        const response = {
            code: this.getStatusCode(status),
            status: status,
            message: message,
            timestamp: new Date().getTime(),
            data: data,
            error: null,
        };
        return response;
    }
    errorResponse(error, message = enum_1.ExceptionMessage.SOMETHING_WENT_WRONG, status = enum_1.HttpStatusMessage.BAD_REQUEST) {
        const ErrorResponse = {
            code: (error === null || error === void 0 ? void 0 : error.code) || this.getStatusCode(status),
            status: (error === null || error === void 0 ? void 0 : error.status) || status,
            message: (error === null || error === void 0 ? void 0 : error.message) || message,
            timestamp: new Date().getTime(),
            data: null,
            error: error.data || error,
        };
        return ErrorResponse;
    }
    getStatusCode(code) {
        return enum_2.HttpStatusCode[code] || enum_2.HttpStatusCode.BAD_REQUEST;
    }
}
exports.responseUitls = new ResponseUitls();
