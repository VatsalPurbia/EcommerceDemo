import {
  ExceptionMessage,
  HttpStatusCode,
  HttpStatusMessage,
  SuccessMessage,
} from "../interface/enum";
import { userService } from "../service/user.service";
import { responseUitls } from "../utils/response.util";
import { Request, Response } from "express";
import { WellcomeMsg } from "../interface/enum";
import { AcceptAny } from "../interface/type";
class UserController {
    /**
   * @param req 
   * @param res TESTING API FOR HOME PAGE 
   */
  home = async (req: Request, res: Response) => {
    console.log("HERE");
    
    res.send(WellcomeMsg.WELLCOME_TO_USER_SERVICE);
  };
  /**
   * @description This api is used for singUp user
   * @param req All the data of user
   * @param res send otp to user for verification
   */
  signin = async (req: Request, res: Response) => {
    try {
      const payload = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        mobile: req.body.mobile,
        type: req.body.type,
      };
      let response = await userService.signinRedis(payload);
      let finalResponse = responseUitls.successResponse(
        { response },
        SuccessMessage.Mail_SEND,
        HttpStatusMessage.OK
      );
      res.status(HttpStatusCode.OK).send(finalResponse);
    } catch (error) {
      let err = responseUitls.errorResponse(
        error,
        ExceptionMessage.USER_ALREADY_EXIST
      );
      res.status(HttpStatusCode.BAD_REQUEST).send(err);
    }
  };
  /**
   * @description This api is used for Login admin
   * @param req EMAIL AND PASSWORD FOR ADMIN LOGIN
   * @param res OTP GENRATION
   */
  signinVerification = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      let response = await userService.signin(payload);
      let finalResponse = responseUitls.successResponse(
        { response },
        SuccessMessage.USER_REGISTRATION,
        HttpStatusMessage.CREATED
      );
      res.send(finalResponse);
    } catch (err) {
      let error = responseUitls.errorResponse(err);
      res.send(error);
    }
  };
  /**
   * @description This api is used for Login User
   * @param req EMAIL AND PASSWORD FOR user LOGIN
   * @param res Session and Token Mangment
   */
  login = async (req: Request, res: Response) => {
    try {
      const reqBody = req.body;
      const reqHeaders = req.headers;

      const payload: AcceptAny = {
        body: reqBody,
        headers: reqHeaders,
      };
      console.log(payload);
      const response: AcceptAny = await userService.login(payload);
      const finalResponce = responseUitls.successResponse(
        response,
        HttpStatusMessage.ACCEPTED
      );
      res.status(HttpStatusCode.ACCEPTED).send(finalResponce);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(
          responseUitls.errorResponse(
            error,
            ExceptionMessage.EMAIL_NOT_EXISTS,
            HttpStatusMessage.INTERNAL_SERVER_ERROR
          )
        );
    }
  };
  
}
export const userController = new UserController();
