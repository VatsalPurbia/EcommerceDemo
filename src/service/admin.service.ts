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


class adminService{
    login =async (payload:AcceptAny) => {
        
        
    }
}