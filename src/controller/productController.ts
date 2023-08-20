import { responseUitls } from "../utils/response.util";
import { Request, Response } from "express";
import { ExceptionMessage, HttpStatusCode, HttpStatusMessage, SuccessMessage } from "../interface/enum";
import { AcceptAny } from "../interface/type";
import dotenv from 'dotenv'
import { productServiceV1 } from "../service/product.service";
import { fail } from "assert";

dotenv.config()

class productController{
    AddProduct =async (req : Request , res : Response) => {
        try{
            const payload : AcceptAny = req.body;
            let response = await productServiceV1.AddProduct(payload);
            let finalResponce = responseUitls.successResponse({response}, SuccessMessage.PRODUCT_CREATED,HttpStatusMessage.OK)
            res.status(HttpStatusCode.ACCEPTED).send(finalResponce)
        }   
        catch(error){
            let err=responseUitls.errorResponse(error,ExceptionMessage.SOMETHING_WENT_WRONG)
            res.status(HttpStatusCode.BAD_REQUEST).send(err);
        }
    };
    EditProduct =async (req : Request , res : Response) => {
        try {
            const payload : AcceptAny = {
                body : req.body,
                query : req.query
            }
            let response = await productServiceV1.EditProducts(payload);
            let finalResponce = responseUitls.successResponse({response},SuccessMessage.PRODUCT_EDITED,HttpStatusMessage.OK)
            res.status(HttpStatusCode.ACCEPTED).send(finalResponce)
        }catch(error){
            let err=responseUitls.errorResponse(error,ExceptionMessage.SOMETHING_WENT_WRONG)
            res.status(HttpStatusCode.BAD_REQUEST).send(err);
        }

    };
    DelteProduct =async (req : Request , res : Response) => {
        try {
            const payload : AcceptAny = req.query
            let response = await productServiceV1.deleteProduct(payload)
            let finalResponce = responseUitls.successResponse({response},SuccessMessage.PRODUCT_DELETED,HttpStatusMessage.OK)
            res.status(HttpStatusCode.OK).send(finalResponce)
        }catch(error){
            let err=responseUitls.errorResponse(error,ExceptionMessage.SOMETHING_WENT_WRONG)
            res.status(HttpStatusCode.BAD_REQUEST).send(err);
        }
    }
    
}
export const ProductControllerV1 = new productController()