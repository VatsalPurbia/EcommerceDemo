import mongoose, { Schema} from "mongoose"
import { mongo} from "../provider/mongo/mongo"
import { COLLECTION, USER_TYPE } from "../interface/enum"
interface IAddress {
    city:string,
    street:string,
    description:string
}
interface IUser {
    name:string,
    username:string,
    password:string,
    email:string,
    mobile:number,
    type:USER_TYPE,
    address:IAddress[]
}
const AddessSchema = new Schema<IAddress>(
{
    city:String,
    street:String,
    description:String
})
const userSchema = new Schema<IUser>({
    name:String,
    username:String,
    password:String,
    email:String,
    mobile:Number,
    type:{type:String,enum:USER_TYPE},
    address:[AddessSchema]
})
export const userModel = mongo.getConnection().model<IUser>(COLLECTION.USER,userSchema)