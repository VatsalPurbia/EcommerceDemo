import mongoose, { NumberSchemaDefinition, Schema} from "mongoose"
import { mongo} from "../provider/mongo/mongo"
import { COLLECTION, USER_TYPE } from "../interface/enum"

interface IChat extends Document {
    praticipentId : Schema.Types.ObjectId,
    productDetails : {
        productId : Schema.Types.ObjectId,
        messages : string
        senderId : Schema.Types.ObjectId,
        messsageContent : string,    
    }
}

const ChatSchema = new Schema<IChat>({
    praticipentId : {type : Schema.Types.ObjectId , required : true},
    productDetails :{
        productId : Schema.Types.ObjectId,
        message : String,
        senderId : Schema.Types.ObjectId,
        messsageContent : String
    },
},
{
    timestamps : true
})

export const ChatModel = mongo.getConnection().model<IChat>(COLLECTION.CHAT,ChatSchema)
