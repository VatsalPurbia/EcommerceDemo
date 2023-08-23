import mongoose, { NumberSchemaDefinition, Schema} from "mongoose"
import { mongo} from "../provider/mongo/mongo"
import { COLLECTION, USER_TYPE } from "../interface/enum"

interface ICart extends Document {
    productId : Schema.Types.ObjectId,
    productName : string,
    quantity : number,
}    

const CartSchema = new Schema<ICart>({
    productId : {type : Schema.Types.ObjectId , required :true},
    productName : {type : String , required :true},
    quantity :{}
})