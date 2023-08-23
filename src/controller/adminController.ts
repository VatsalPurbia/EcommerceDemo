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

class adminController {
  login = async (req: Request, res: Response) => {
    try {
        const payload : AcceptAny = req.body
        
    } catch (error) {
      throw error ;
    }
  };
}
