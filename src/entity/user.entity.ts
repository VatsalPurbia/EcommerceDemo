import { userModel } from "../model/user.schema";
import BaseEntity from "./base-mongo-entity";

class UserEntity extends BaseEntity{
    constructor()
    {
        super(userModel)
    }
    async  findUser(userId : string) {
      return  await this.findOne({_id : userId},{name : 1 })
        
    }
}
export const userEntity = new UserEntity();