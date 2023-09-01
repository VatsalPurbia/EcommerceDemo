import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { sessionModel } from "../model/session.schema";
import dotenv from "dotenv";
import {
  ExceptionMessage,
  HttpStatusCode,
  HttpStatusMessage,
} from "../interface/enum";
import { AcceptAny } from "../interface/type";
import { userSessionE } from "../entity/session.entity";
import { CustomException } from "../utils/exception.utils";
import { responseUitls } from "../utils/response.util";
dotenv.config();

class sessionCheck {
  tokenVerification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = "" + req.headers.authorization;
    console.log(token  , 'here -- - -- - - ')
    let decoded: AcceptAny;

    try {
      decoded = jwt.verify(token, `${process.env.SECRET_KEY}`);
    } catch (error) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .send(
          responseUitls.errorResponse(
            error,
            ExceptionMessage.TOKEN_NOT_FOUND,
            HttpStatusMessage.AMBIGUOUS
          )
        );
    }
    try {
      let data = await userSessionE.findOne(
        {
          userId: decoded._id,
          isActive: true,
        },
        {}
      );
      console.log(data)
      if (data) {
        req.body.id = decoded._id;
        next();
      } else {
        throw new CustomException(
          ExceptionMessage.AUTH_INVALID_TOKEN,
          HttpStatusMessage.BAD_REQUEST
        );
      }
    } catch (error) {
      throw error;
    }
  };
}

export const sessionCheckv1 = new sessionCheck();
