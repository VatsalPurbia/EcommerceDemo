import Joi from 'joi';
import { USER_TYPE } from '../../interface/enum';
export const JOI_VALIDATION = {
    USER: {
        SIGNUP: {
            name : Joi.string().min(2).max(40).required(),
            username : Joi.string().min(2).max(30).required(),
            email: Joi.string().min(1).required(),
            password : Joi.string().min(8).max(30),
            phoneNumber: Joi.string().min(1).required(),
            type: Joi.number().valid(USER_TYPE.BUYER, USER_TYPE.BUYER),
        },
        LOGIN: {
            email: Joi.string().min(1).required(),
            password: Joi.string().min(8).max(30).required(),
        },
        VERIFY_OTP: {
            otp: Joi.string().min(6).max(6).required(),
        },
        FORGOT_PASSWORD :{
            email: Joi.string().min(1).required()
        },
        SET_NEW_PASS :{
            email: Joi.string().min(1).required(),
            otp: Joi.string().min(6).max(6).required(),
            newPassword : Joi.string().min(8).max(30).required()
        }
        
    },
   
};
