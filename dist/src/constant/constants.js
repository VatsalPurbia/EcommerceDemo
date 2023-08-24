"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIL_SUBJECT = exports.NODEMAILER_CONFIG = exports.swaggerContext = exports.adminContext = exports.userContext = exports.portNumber = void 0;
exports.portNumber = 3000;
exports.userContext = '/user';
exports.adminContext = '/admin';
exports.swaggerContext = '/swagger/api-doc';
exports.NODEMAILER_CONFIG = {
    service: 'gmail',
    auth: {
        user: 'vatsal.purbia@appinventiv.com',
        pass: 'owkfiosiovbdwdjc',
    },
};
var MAIL_SUBJECT;
(function (MAIL_SUBJECT) {
    MAIL_SUBJECT["VERIFICATION_OTP"] = "Otp Verification";
    MAIL_SUBJECT["ADMIN_OTP_VERIFICATION"] = "ADMIN OTP VERIFICATION";
})(MAIL_SUBJECT || (exports.MAIL_SUBJECT = MAIL_SUBJECT = {}));
