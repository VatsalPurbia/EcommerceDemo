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
exports.nodeMailer = void 0;
const constants_1 = require("../../constant/constants");
const exception_utils_1 = require("../../utils/exception.utils");
const enum_1 = require("../../interface/enum");
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailgen_1 = __importDefault(require("mailgen"));
class NodeMailer {
    constructor() {
        this.templateGenerate = (otp, name) => __awaiter(this, void 0, void 0, function* () {
            const mailGenerator = new mailgen_1.default({
                theme: "default",
                product: {
                    name: "Verification code",
                    link: "https://mail.google.com/mail/u/0/#inbox"
                }
            });
            const description = {
                body: {
                    name: `${name}`,
                    intro: `Your OTP is ${otp} and valid for 15 minutes`
                }
            };
            const mail = mailGenerator.generate(description);
            return mail;
        });
        this.config = constants_1.NODEMAILER_CONFIG;
    }
    sendMail(receiverMailId, otp, subject, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.senderMailId = constants_1.NODEMAILER_CONFIG.auth.user;
                const htmlBody = yield this.templateGenerate(otp, name);
                const transport = nodemailer_1.default.createTransport(this.config);
                const mailMessage = {
                    from: this.senderMailId,
                    to: receiverMailId,
                    subject: subject,
                    text: otp,
                    html: htmlBody, // html body
                };
                transport
                    .sendMail(mailMessage)
                    .then(() => {
                    return {};
                })
                    .catch(() => {
                    throw new exception_utils_1.CustomException(enum_1.ExceptionMessage.SOMETHING_WENT_WRONG, enum_1.HttpStatusMessage.SERVICE_UNAVAILABLE);
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.nodeMailer = new NodeMailer();
