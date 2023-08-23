// import mongoose, { NumberSchemaDefinition, Schema} from "mongoose"
// import { mongo} from "../provider/mongo/mongo"
// import { COLLECTION, USER_TYPE } from "../interface/enum"
// import { OrderStatus } from "../interface/enum"
// import { Product } from "mailgen";

// interface productSchema{
//     productsId: { type: Schema.Types.ObjectId, required: true },
//     quantity: { type: Number, required: true },
//     PriceAtTimeOfOrder: { type: Number, required: true }
// };

// interface IOrder extends Document {
//     userId : Schema.Types.ObjectId,
//     productsData : productSchema,
//     OrderStatus : OrderStatus,
//     OrderDate : Date,
//     TotalOrderPrice : number,
//     Address : {
//         HouseNumber : number,
//         Street : string,
//         City : string,
//         Locality : string,
//         PinCode : number
//     }
// }

// const orderModel = new Schema<IOrder>({
//     userId : {type : Schema.Types.ObjectId , required : true},
//     productsData :  

//     }
// })