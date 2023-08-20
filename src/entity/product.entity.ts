import { productModel } from "../model/product.schema";
import BaseEntity from "./base-mongo-entity";

class productEntity extends BaseEntity{ 
    constructor(){
        super(productModel);
    }
}
export const productE = new productEntity();
