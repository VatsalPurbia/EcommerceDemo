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
exports.userService = void 0;
const constants_1 = require("../constant/constants");
const user_entity_1 = require("../entity/user.entity");
const enum_1 = require("../interface/enum");
const nodenmailer_1 = require("../provider/nodemailer/nodenmailer");
const redis_1 = require("../provider/redis/redis");
const exception_utils_1 = require("../utils/exception.utils");
const utils_1 = require("../utils/utils");
const session_entity_1 = require("../entity/session.entity");
const jsonwebtoken_1 = require("jsonwebtoken");
class UserService {
    constructor() {
        this.signinRedis = (payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield user_entity_1.userEntity.findOne({ $or: [{ username: payload.username }, { email: payload.email }] }, { email: 1, username: 1 }, {});
                console.log(data, "------------");
                if (data == null) {
                    let token = utils_1.utils.otpGenerator(6);
                    console.log(token);
                    const subject = constants_1.MAIL_SUBJECT.VERIFICATION_OTP;
                    yield nodenmailer_1.nodeMailer.sendMail(payload.email, token, subject, payload.name);
                    redis_1.redis.setKeyWithExpiry(`${token}`, `${payload.email}`, 300);
                    let payloadData = JSON.stringify(payload);
                    redis_1.redis.setKeyWithExpiry(`${payload.email}+${token}`, `${payloadData}`, 300);
                    return enum_1.SuccessMessage.USER_REGISTRATION_MAIL;
                }
                if (data.email) {
                    throw new exception_utils_1.CustomException(enum_1.ExceptionMessage.EMAIL_ALREADY_EXIST, enum_1.HttpStatusMessage.FORBIDDEN);
                }
                else if (data.username) {
                    throw new exception_utils_1.CustomException(enum_1.ExceptionMessage.USER_ALREADY_EXIST, enum_1.HttpStatusMessage.FORBIDDEN);
                }
            }
            catch (error) {
                throw error;
            }
        });
        this.signin = (payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                let email = yield redis_1.redis.getKey(`${payload.otp}`);
                if (email == null) {
                    throw new exception_utils_1.CustomException(enum_1.ExceptionMessage.INCORRECT_OTP, enum_1.HttpStatusMessage.FORBIDDEN);
                }
                let data = "" + (yield redis_1.redis.getKey(`${email}+${payload.otp}`));
                let finalData = JSON.parse(data);
                yield user_entity_1.userEntity.insertMany(finalData, {}).catch(() => {
                    throw new exception_utils_1.CustomException(enum_1.ExceptionMessage.SOMETHING_WENT_WRONG, enum_1.HttpStatusMessage.INTERNAL_SERVER_ERROR);
                });
                return enum_1.SuccessMessage.USER_REGISTRATION;
            }
            catch (error) {
                throw error;
            }
        });
        this.login = (payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield user_entity_1.userEntity.findOne({
                    username: payload.body.username,
                    password: payload.body.password,
                }, { _id: 1 }, {});
                if (data) {
                    let redisSession = yield redis_1.redis.getKey(data._id);
                    if (!redisSession) {
                        let dataSession = yield session_entity_1.userSessionE.findOne({
                            userId: data._id,
                            isActive: true,
                            deviceId: payload.headers.deviceId
                        }, {});
                        if (dataSession) {
                            if (dataSession.deviceId !== payload.headers.deviceId) {
                                yield session_entity_1.userSessionE.saveData({
                                    userId: data._id,
                                    isActive: true,
                                    deviceId: payload.headers.deviceId
                                });
                            }
                            redis_1.redis.setKeyWithExpiry(`${data._id}`, `${data.deviceId}`, 9000);
                        }
                        else {
                            yield session_entity_1.userSessionE.saveData({
                                userId: data._id,
                                isActive: true,
                                deviceId: payload.headers.deviceId
                            });
                            redis_1.redis.setKeyWithExpiry(`${data._id}`, `${data.deviceId}`, 9000);
                        }
                        yield session_entity_1.userSessionE.updateMany({ userId: data === null || data === void 0 ? void 0 : data._id, deviceId: { $ne: payload.headers.deviceId } }, { isActive: false }, { userId: 1, isActive: 1, deviceId: 1 });
                        const token = (0, jsonwebtoken_1.sign)({ _id: data === null || data === void 0 ? void 0 : data._id }, `${process.env.SECRET_KEY}`, {
                            expiresIn: '1h',
                        });
                        return token;
                    }
                }
                else {
                    throw new exception_utils_1.CustomException(enum_1.ExceptionMessage.USER_NOT_FOUND, enum_1.HttpStatusMessage.NOT_FOUND);
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.userService = new UserService();
