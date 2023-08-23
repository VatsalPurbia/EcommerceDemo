import mongoose, { Schema} from "mongoose"
import { mongo} from "../provider/mongo/mongo"
import { COLLECTION, USER_TYPE } from "../interface/enum"

interface IAdmin {
    name:string,
    username:string,
    password:string,
    email:string,
    mobile:number,
    type:USER_TYPE,
}

const adminSchema = new Schema<IAdmin>({
    name:String,
    username:String,
    password:String,
    email:String,
    mobile:Number,
    type:{type:String,enum:USER_TYPE},
})

export const adminModel = mongo.getConnection().model<IAdmin>(COLLECTION.USER,adminSchema)