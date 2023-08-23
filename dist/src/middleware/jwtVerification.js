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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionCheckv1 = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const enum_1 = require("../interface/enum");
const session_entity_1 = require("../entity/session.entity");
const exception_utils_1 = require("../utils/exception.utils");
const response_util_1 = require("../utils/response.util");
dotenv_1.default.config();
class sessionCheck {
    constructor() {
        this.tokenVerification = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = "" + req.headers.authorization;
            let decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(token, `${process.env.SECRET_KEY}`);
            }
            catch (error) {
                res
                    .status(enum_1.HttpStatusCode.UNAUTHORIZED)
                    .send(response_util_1.responseUitls.errorResponse(error, enum_1.ExceptionMessage.TOKEN_NOT_FOUND, enum_1.HttpStatusMessage.AMBIGUOUS));
            }
            try {
                let data = yield session_entity_1.sessionEntity.findOne({
                    userId: decoded._id,
                    isActive: true,
                }, {});
                if (data.length > 0) {
                    req.headers.userId = decoded._id;
                    next();
                }
                else {
                    throw new exception_utils_1.CustomException(enum_1.ExceptionMessage.AUTH_INVALID_TOKEN, enum_1.HttpStatusMessage.BAD_REQUEST);
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.sessionCheckv1 = new sessionCheck();
