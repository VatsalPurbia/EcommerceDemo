export const portNumber=3000
export const userContext='/user'
export const adminContext ='/admin'

export const swaggerContext = '/swagger/api-doc'

export const NODEMAILER_CONFIG = {
    service: 'gmail',
    auth: {
        user: 'vatsal.purbia@appinventiv.com',
        pass: 'owkfiosiovbdwdjc',
    },
};
export enum MAIL_SUBJECT {
    VERIFICATION_OTP = 'Otp Verification',
    ADMIN_OTP_VERIFICATION = 'ADMIN OTP VERIFICATION'
}