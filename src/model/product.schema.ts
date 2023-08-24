import mongoose, { NumberSchemaDefinition, Schema } from "mongoose";
import { mongo } from "../provider/mongo/mongo";
import { COLLECTION, USER_TYPE } from "../interface/enum";

interface IProducts extends Document {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  userId: Schema.Types.ObjectId;
}

const productSchema = new Schema<IProducts>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const productModel = mongo
  .getConnection()
  .model<IProducts>(COLLECTION.PRODUCT, productSchema);
