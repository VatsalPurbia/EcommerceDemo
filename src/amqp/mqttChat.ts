import mqtt, { connect, MqttClient } from "mqtt";
import express, { Request, Response } from "express";
import { userEntity } from "../entity/user.entity";
import { CustomException } from "../utils/exception.utils";
import {
  ExceptionMessage,
  HttpStatusCode,
  HttpStatusMessage,
  SuccessMessage,
} from "../interface/enum";
import { responseUitls } from "../utils/response.util";
import { productE } from "../entity/product.entity";

const messageArray: string[] = [];
const client: MqttClient = connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

client.on("message", (topic, obejct) => {
  const chatMessage = obejct.toString();
  console.log(`Received message from topic ${topic}: ${chatMessage}`);
  messageArray.push(chatMessage);
});

export async function subscribeToReviewerChatMessages(
  req: Request,
  res: Response
): Promise<void> {
  const { reviewId } = req.params;

  client.subscribe(`chat/reviewer/${reviewId}`, (error) => {
    if (error) {
      console.error(`Error subscribing to topic: ${error}`);
      const errorResponce = responseUitls.errorResponse(
        error,
        ExceptionMessage.ISSUE_IN_SUBSCRIBING,
        HttpStatusMessage.INTERNAL_SERVER_ERROR
      )
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(errorResponce);
    } else {
      console.log(`Subscribed to topic chat/reviewer/${reviewId}`);
      const finalResponce = responseUitls.successResponse(
        req,
        SuccessMessage.SUBSCRIBED_SUCCESSFULLY,
        HttpStatusMessage.OK

      )
      res.status(HttpStatusCode.OK).send(finalResponce);
    }
  });
}

export function getReviewerChatMessages(req: Request, res: Response): void {
  try{
    const finalResponce = responseUitls.successResponse(
        messageArray,
        SuccessMessage.ALL_MESSAGES,
        HttpStatusMessage.CONTINUE
    )
    res.status(HttpStatusCode.CONTINUE).send(finalResponce);
    }
    catch(error){
        console.log(error)
        const err = responseUitls.errorResponse(
            error,
            ExceptionMessage.SOMETHING_WENT_WRONG,
            HttpStatusMessage.INTERNAL_SERVER_ERROR
        )
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(err)
    }
}

export async function sendChatToReviewer(req: Request, res: Response) {
  try {
    const { message, reviewId, userId } = req.body;
    console.log(req.body);
    const response = await userEntity.findUser(userId);
    if (!response) {
      throw new CustomException(
        ExceptionMessage.USER_NOT_FOUND,
        HttpStatusMessage.NOT_FOUND
      ).getError();
    }
    const obejct: any = {
      name: response.name,
      message: message,
    };

    const data = client?.publish(`chat/reviewer/${reviewId}`, obejct);
    const finalResponce = responseUitls.successResponse(
      data,
      SuccessMessage.MESSAGE_PUBLISHED,
      HttpStatusMessage.CREATED
    );
    res.status(HttpStatusCode.CREATED).send(finalResponce);
  } catch (error) {
    console.log(error);
  }
}

export async function sendChatToUser(req: Request, res: Response) {
  try {
    const { message, reviewId, userId, productId } = req.body;
    const response = await userEntity.findUser(userId);
    if (!response) {
      throw new CustomException(
        ExceptionMessage.USER_NOT_FOUND,
        HttpStatusMessage.NOT_FOUND
      ).getError();
    }
    const reviewData = await productE.findReview(reviewId, productId);
    if (!reviewData) {
      throw new CustomException(
        ExceptionMessage.REVIEW_NOT_FOUND,
        HttpStatusMessage.NOT_FOUND
      ).getError();
    }
    const obejct: any = {
      name: response.name,
      message: message,
    };
    // Publish the chat message to the website's topic
    const data = client?.publish(`chat/reviewer/${reviewId}`, obejct);
    const finalResponce = responseUitls.successResponse(
      data,
      SuccessMessage.MESSAGE_PUBLISHED,
      HttpStatusMessage.CREATED
    );
    res.status(HttpStatusCode.CREATED).send(finalResponce);
  } catch (error) {
    console.log(error);
    const errorResponse = responseUitls.errorResponse(
      error,
      ExceptionMessage.SOMETHING_WENT_WRONG,
      HttpStatusMessage.INTERNAL_SERVER_ERROR
    );
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(errorResponse);
  }
}
