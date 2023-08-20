"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const randomstring_1 = __importDefault(require("randomstring"));
const otp_generator_1 = __importDefault(require("otp-generator"));
class Utils {
    otpGenerator(digits) {
        return otp_generator_1.default.generate(digits, { specialChars: false, digits: true });
    }
    generateRandomString(digits) {
        return randomstring_1.default.generate(digits);
    }
}
exports.utils = new Utils();
