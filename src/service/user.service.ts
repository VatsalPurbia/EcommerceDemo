import { MAIL_SUBJECT } from "../constant/constants";
import { userEntity } from "../entity/user.entity";
import {
  ExceptionMessage,
  HttpStatusCode,
  HttpStatusMessage,
  SuccessMessage,
} from "../interface/enum";
import jwt from "jsonwebtoken";
import { AcceptAny } from "../interface/type";
import { nodeMailer } from "../provider/nodemailer/nodenmailer";
import { redis } from "../provider/redis/redis";
import { CustomException } from "../utils/exception.utils";
import { utils } from "../utils/utils";
import { sessionEntity } from "../entity/session.entity";
import {sign} from 'jsonwebtoken'


class UserService {
  constructor() {}
  signinRedis = async (payload: AcceptAny) => {
    try {
      let data = await userEntity.findOne(
        { $or: [{ username: payload.username }, { email: payload.email }] },
        { email: 1, username: 1 },
        {}
      );
      console.log(data, "------------");
      if (data == null) {
        let token = utils.otpGenerator(6);
        console.log(token);
        const subject = MAIL_SUBJECT.VERIFICATION_OTP;
        await nodeMailer.sendMail(payload.email, token, subject, payload.name);
        redis.setKeyWithExpiry(`${token}`, `${payload.email}`, 300);
        let payloadData = JSON.stringify(payload);
        redis.setKeyWithExpiry(
          `${payload.email}+${token}`,
          `${payloadData}`,
          300
        );
        return SuccessMessage.USER_REGISTRATION_MAIL;
      }
      if (data.email) {
        throw new CustomException(
          ExceptionMessage.EMAIL_ALREADY_EXIST,
          HttpStatusMessage.FORBIDDEN
        );
      } else if (data.username) {
        throw new CustomException(
          ExceptionMessage.USER_ALREADY_EXIST,
          HttpStatusMessage.FORBIDDEN
        );
      }
    } catch (error) {
      throw error;
    }
  };
  signin = async (payload: AcceptAny) => {
    try {
      let email = await redis.getKey(`${payload.otp}`);
      if (email == null) {
        throw new CustomException(
          ExceptionMessage.INCORRECT_OTP,
          HttpStatusMessage.FORBIDDEN
        );
      }
      let data = "" + (await redis.getKey(`${email}+${payload.otp}`));
      let finalData = JSON.parse(data);
      await userEntity.insertMany(finalData, {}).catch(() => {
        throw new CustomException(
          ExceptionMessage.SOMETHING_WENT_WRONG,
          HttpStatusMessage.INTERNAL_SERVER_ERROR
        );
      });
      return SuccessMessage.USER_REGISTRATION;
    } catch (error) {
      throw error;
    }
  };
  login = async (payload: AcceptAny) => {
    try {
      let data = await userEntity.findOne(
        {
          username: payload.body.username,
          password: payload.body.password,
        },
        { _id: 1 },
        {}
      );
      if (data) {
        let redisSession = await redis.getKey(data._id)
        if(!redisSession){
            let dataSession=await sessionEntity.findOne({
                userId:data._id,
                isActive:true,
                deviceId:payload.headers.deviceId
            },{})
            if(dataSession)
            {if(dataSession.deviceId !== payload.headers.deviceId){
               await sessionEntity.saveData({
                userId : data._id,
                isActive : true,
                deviceId : payload.headers.deviceId
               })
            }
                redis.setKeyWithExpiry(`${data._id}`,`${data.deviceId}`,9000)
            }else{
              await sessionEntity.saveData({
                userId : data._id,
                isActive : true,
                deviceId : payload.headers.deviceId
              })
              redis.setKeyWithExpiry(`${data._id}`,`${data.deviceId}`,9000)
            }
            await sessionEntity.updateMany(
              { userId: data?._id, deviceId: { $ne: payload.headers.deviceId } },
              { isActive: false },
              { userId: 1, isActive: 1, deviceId: 1 }
          );
          const token = sign({ _id: data?._id }, `${process.env.SECRET_KEY}`, {
            expiresIn: '1h',
        });
        }
      } else {
        throw new CustomException(
          ExceptionMessage.USER_NOT_FOUND,
          HttpStatusMessage.NOT_FOUND
        );
      }
    } catch (error) {
      throw error;
    }
  };
}
export const userService = new UserService();
