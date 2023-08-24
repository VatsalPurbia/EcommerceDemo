import { userEntity } from "../entity/user.entity";
import {
  ExceptionMessage,
  HttpStatusCode,
  HttpStatusMessage,
  SuccessMessage,
} from "../interface/enum";
import { userService } from "../service/user.service";
import { responseUitls } from "../utils/response.util";
import { Request, Response } from "express";
import { utils } from "../utils/utils";
import { AcceptAny } from "../interface/type";
import { adminE } from "../entity/admin.entity";
import { CustomException } from "../utils/exception.utils";
import { adminSessionE } from "../entity/admin.session.entity";
import { nodeMailer } from "../provider/nodemailer/nodenmailer";
import { redis } from "../provider/redis/redis";
import { MAIL_SUBJECT } from "../constant/constants";
import { error } from "console";
class adminController {
  home = async (req: Request, res: Response) => {
    res.send("WELLCOME TO ADMIN HOME PAGE");
  };
  login = async (req: Request, res: Response) => {
    try {
      const payload: AcceptAny = req.body;
      const admin: AcceptAny = await adminE.checkEmailExist(payload.email);
      if (!admin) {
        throw new CustomException(
          ExceptionMessage.EMAIL_NOT_EXISTS,
          HttpStatusMessage.NOT_FOUND
        ).getError();
      }
      if (admin.password !== payload.password) {
        throw new CustomException(
          ExceptionMessage.INVALID_PASSWORD,
          HttpStatusMessage.UNAUTHORIZED
        ).getError();
      }

      const subject = MAIL_SUBJECT.ADMIN_OTP_VERIFICATION;
      const otp = utils.otpGenerator(4);
      redis.setKeyWithExpiry(`OTP${payload.email}`, `${otp}`, 180000);
      await nodeMailer.sendMail(
        `${payload.email}`,
        `${otp}`,
        subject,
        admin.name
      );
      let payloadData = JSON.stringify(payload);
      redis.setKeyWithExpiry(`${payload.email}+${otp}`, `${payloadData}`, 3000);
      const finalResponce = responseUitls.successResponse(
        { payloadData },
        SuccessMessage.Mail_SEND,
        HttpStatusMessage.OK
      );
      res.status(HttpStatusCode.OK).send(finalResponce);
    } catch (error) {
      const err = responseUitls.errorResponse(
        error,
        ExceptionMessage.SOMETHING_WENT_WRONG,
        HttpStatusMessage.INTERNAL_SERVER_ERROR
      );
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(err);
    }
  };
  otpVerify = async (req: Request, res: Response) => {
    try {
      const payload: AcceptAny = req.body;
      const admin = await adminE.findOne({ email: req.body.email }, { _id: 1 });
      if (!admin) {
        throw new CustomException(
          ExceptionMessage.ADMIN_NOT_FOUND,
          HttpStatusMessage.NOT_FOUND
        );
      }
      const otp = await adminE.verifyOtp(payload.email);
      // console.log(payload.otp, "payloadotp herer")
      if (otp !== payload.otp) {
        const err = responseUitls.errorResponse(
            error,
            ExceptionMessage.INCORRECT_OTP,
            HttpStatusMessage.UNAUTHORIZED
        )
        res.status(HttpStatusCode.UNAUTHORIZED).send(err)

      }

      console.log(payload, "-------------------");
      const payloadData = JSON.stringify(payload);
      const adminSession = await adminSessionE.createAdminSession(admin);
      const accesToken = await adminSessionE.createAdminToken(adminSession);
      const finalResponce = responseUitls.successResponse(
        { payloadData },
        accesToken
      );
      res.status(HttpStatusCode.OK).send(finalResponce);
    } catch (error) {
        const err = responseUitls.errorResponse(
            error,
            ExceptionMessage.SOMETHING_WENT_WRONG,
            HttpStatusMessage.INTERNAL_SERVER_ERROR
        )
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(err)
    }
  };
}

export const adminControllerV1 = new adminController();
