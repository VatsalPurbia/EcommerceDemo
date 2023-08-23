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
exports.validate = void 0;
const response_util_1 = require("../../utils/response.util");
class Validation {
    constructor() {
        /**
         * @description Validate Body of Incoming Request
         * @param schema
         * @returns
         */
        this.body = (schema) => {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const { error } = schema.validate(req.body);
                if (error) {
                    const err = response_util_1.responseUitls.errorResponse({
                        message: (error === null || error === void 0 ? void 0 : error.message) || ((_a = error === null || error === void 0 ? void 0 : error.details[0]) === null || _a === void 0 ? void 0 : _a.message),
                    });
                    return res.status(err.code).send(err);
                }
                next();
            });
        };
        /**
         * @description Validate Param of Incoming Request
         * @param schema
         * @returns
         */
        this.params = (schema) => {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { error } = schema.validate(req.params);
                if (error) {
                    const err = response_util_1.responseUitls.errorResponse({
                        message: error.details[0].message,
                    });
                    return res.status(err.code).send(err);
                }
                next();
            });
        };
        /**
         * @description Validate Qeury Param of Incoming Request
         * @param schema
         * @returns
         */
        this.queryParam = (schema) => {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { error } = schema.validate(req.query, { context: true });
                if (error) {
                    const err = response_util_1.responseUitls.errorResponse({
                        message: error.details[0].message,
                    });
                    return res.status(err.code).send(err);
                }
                next();
            });
        };
        /**
         * @description Validate Header of Incoming Request
         * @param schema
         * @returns
         */
        this.headers = (schema) => {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { error } = schema.validate(req.headers);
                if (error) {
                    const err = response_util_1.responseUitls.errorResponse({
                        message: error.details[0].message,
                    });
                    return res.status(err.code).send(err);
                }
                next();
            });
        };
    }
}
exports.validate = new Validation();
