import { AcceptAny } from "../interface/type";
import { adminModel } from "../model/admin.schema";
import { redis } from "../provider/redis/redis";
import BaseEntity from "./base-mongo-entity";

class adminEntity extends BaseEntity{ 
    constructor(){
        super(adminModel);
    }
    async checkEmailExist(email: string) {
        try {
            return await this.findOne({ email: email }, {password : 1 , name : 1});
        } catch (error) {
            console.log('Email already exsists')
            throw error;
        }
    }
    async checkPhoneNumberExist(payload: any) {
        try {
            return await this.findOne(
                { countryCode: payload.countryCode, phoneNumber: payload.phoneNumber },
                {}
            );
        } catch (error) {
            console.log("phone number already exsists")
            throw error;
        }
    }
    async verifyOtp(payload: AcceptAny) {
        try {
            console.log(payload)
            const otp = await redis.getKey(
                `OTP${payload}`
            );
            console.log(otp)
            return otp;
        } catch (error) {
            throw error;
        }
    }
}
export const adminE = new adminEntity();
