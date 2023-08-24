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
exports.utils = void 0;
const randomstring_1 = __importDefault(require("randomstring"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const json_schema_ref_parser_1 = require("@apidevtools/json-schema-ref-parser");
const promises_1 = require("fs/promises");
class Utils {
    otpGenerator(digits) {
        return otp_generator_1.default.generate(digits, { specialChars: false, digits: true });
    }
    generateRandomString(digits) {
        return randomstring_1.default.generate(digits);
    }
    constructSwaggerSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = yield (0, json_schema_ref_parser_1.dereference)('./swagger/swagger.json');
            let data = JSON.stringify(schema);
            yield (0, promises_1.writeFile)('./swagger/parse-swagger.json', data);
            yield (0, promises_1.writeFile)('./dist/swagger/parse-swagger.json', data);
        });
    }
}
exports.utils = new Utils();
