import { nodemailerConfig } from "../../dotenvConfig"

export const portNumber=3000
export const userContext='/user'
export const adminContext ='/admin'
export const productContext = '/product'
export const swaggerContext = '/swagger/api-doc'


export const NODEMAILER_CONFIG = {
    service: nodemailerConfig.SERVICE,
    auth: {
        user: nodemailerConfig.USER,
        pass: nodemailerConfig.PASS,
    },
};
export enum MAIL_SUBJECT {
    VERIFICATION_OTP = 'Otp Verification',
    ADMIN_OTP_VERIFICATION = 'ADMIN OTP VERIFICATION'
}