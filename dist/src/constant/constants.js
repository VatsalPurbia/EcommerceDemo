"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIL_SUBJECT = exports.NODEMAILER_CONFIG = exports.userContext = exports.portNumber = void 0;
exports.portNumber = 8000;
exports.userContext = '/user';
exports.NODEMAILER_CONFIG = {
    service: 'gmail',
    auth: {
        user: 'shashank.kumar@appinventiv.com',
        pass: 'wphtnfrffvbhouui',
    },
};
var MAIL_SUBJECT;
(function (MAIL_SUBJECT) {
    MAIL_SUBJECT["VERIFICATION_OTP"] = "Otp Verification";
})(MAIL_SUBJECT || (exports.MAIL_SUBJECT = MAIL_SUBJECT = {}));
