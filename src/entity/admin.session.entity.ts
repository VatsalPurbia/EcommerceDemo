import BaseEntity from "./base-mongo-entity";
import { redis } from "../provider/redis/redis";
import { AcceptAny } from "../interface/type";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AdminsessionModel } from "../model/admin.session.schema";
dotenv.config()
class SessionEntity extends BaseEntity {
  constructor() {
    super(AdminsessionModel);
  }
  async logoutPreviousSession(userId: string) {
    try {
      await this.updateMany(
        { adminId: userId },
        { isActive: false, updatedAt: new Date().getTime() },
        { new: true, multi: true }
      );

      return {};
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async createAdminToken(sessionData: any) {
    try {
        const dataForToken: AcceptAny = {
            sessionId: sessionData._id,
            adminId: sessionData.adminId,
        };
        return  jwt.sign(dataForToken, `${process.env.SECRET_KEY}` ,{ expiresIn : '1h'});
    } catch (error) {
        // utils.consolelog('createAdminTokenAndSession Catch block', error);
        throw error;
    }
}
  async createAdminSession(payload: AcceptAny) {
    try {
      const adminData: AcceptAny = payload;
      await this.logoutPreviousSession(adminData._id);
      const sessionInfo: AcceptAny = {
        adminId: adminData._id,
        isActive: true,
      };
      const session = await this.saveData(sessionInfo);
      const dataToSaveInRedis = {
        sessionId: session._id.toString(),
        isActive: true,
        ...adminData,
      };
      const dataToSave: any = {
        adminData: JSON.stringify(dataToSaveInRedis),
        adminId: adminData._id,
        status: adminData.status,
      };
      redis.setHash(
        `$AMDINDATA{adminData._id}`,
        adminData._id.toString(),
        JSON.stringify(dataToSave)
      );
      return session;
    } catch (error) {
      throw error;
    }
  }
}
export const adminSessionE = new SessionEntity();
