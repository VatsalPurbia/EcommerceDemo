import mqtt, { connect, MqttClient } from "mqtt";
import express, { Request, Response } from "express";
import { userEntity } from "../entity/user.entity";
import { CustomException } from "../utils/exception.utils";
import {
  ChatStatus,
  ExceptionMessage,
  HttpStatusCode,
  HttpStatusMessage,
  SuccessMessage,
} from "../interface/enum";
import { responseUitls } from "../utils/response.util";
import { ChatModel } from "../model/chat.schema";
import { personalCartE } from "../entity/cart.entity";
import { productE } from "../entity/product.entity";

const messageArray: string[] = [];
const client: MqttClient = connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

client.on("message", (topic, message) => {
  const chatMessage = Object.toString();
  console.log(`Received message from topic ${topic}: ${chatMessage}`);
  const jsonstring = message.toString();
  const recivedData = JSON.parse(jsonstring);
  console.log(recivedData, "Here the data recived from publish");
  ChatModel.create({
    replyToMessageId : recivedData.replyToMessageId,
    topic: topic,
    reciverId : recivedData.reciverId,
    userId: recivedData.userId,
    reviewId: recivedData.reviewId,
    name: recivedData.name,
    message: recivedData.message,
  });
  messageArray.push(jsonstring);
});

export async function subscribeToReviewerChatMessages(
  req: Request,
  res: Response
) {
  const { reviewId } = req.params;

  client.subscribe(`chat/reviewer/${reviewId}`, (error) => {
    if (error) {
      console.error(`Error subscribing to topic: ${error}`);
      const errorResponce = responseUitls.errorResponse(
        error,
        ExceptionMessage.ISSUE_IN_SUBSCRIBING,
        HttpStatusMessage.INTERNAL_SERVER_ERROR
      );
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(errorResponce);
    } else {
      console.log(`Subscribed to topic chat/reviewer/${reviewId}`);
      res.status(HttpStatusCode.OK).send("Subscribed");
    }
  });
}

export function getReviewerChatMessages(req: Request, res: Response): void {
  try {
    // JSON.stringify(messageArray)
    res.send(messageArray);
  } catch (error) {
    console.log(error);
    const err = responseUitls.errorResponse(
      error,
      ExceptionMessage.SOMETHING_WENT_WRONG,
      HttpStatusMessage.INTERNAL_SERVER_ERROR
    );
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(err);
  }
}

export async function sendChatToReviewer(req: Request, res: Response) {
  try {
    const userId = req.body.id;
    const { message, reviewId, reciverId , replyToMessageId} = req.body;
    console.log(req.body);
    const response = await userEntity.findUser(userId);
    if (!response) {
      throw new CustomException(
        ExceptionMessage.USER_NOT_FOUND,
        HttpStatusMessage.NOT_FOUND
      ).getError();
    }
    const Object: any = {
      replyToMessageId : replyToMessageId,
      reciverId : reciverId,
      reviewId: reviewId,
      userId: userId,
      name: response.name,
      message: message,
      status : ChatStatus.DELIVERED
    };
    const jsonString = JSON.stringify(Object);

    client?.publish(`chat/reviewer/${reviewId}`, jsonString);
    res.send("Chat sent");
  } catch (error) {
    console.log(error);
  }
}
export async function getAllmsgs(req: Request, res: Response) {
  try {
    const { reviewId } = req.params;
    const { page, pageSize } = req.query;
    console.log(`here the reviewId ${reviewId}`);

    const pageNumber: number = parseInt(page as string, 10) || 1;
    const itemsPerPage: number = parseInt(pageSize as string, 10) || 10;
    const skip: number = (pageNumber - 1) * itemsPerPage;

    const sortedData = await ChatModel.aggregate([
      { $match: { topic: `chat/reviewer/${reviewId}` } },
      { $sort: { createdAt: 1 } },
      { $project: { name: 1, message: 1, _id: 0, status :1 } },
      { $skip: skip },
      { $limit: itemsPerPage },
    ]);
    await ChatModel.updateMany(
      { topic: `chat/reviewer/${reviewId}`, status: ChatStatus.DELIVERED },
      { $set: { status: ChatStatus.SEEN } }
    );

    const finalRes = responseUitls.successResponse(
      sortedData,
      SuccessMessage.ALL_CHAT_DATA_FOUND,
      HttpStatusMessage.ACCEPTED
    );
    res.status(HttpStatusCode.ACCEPTED).send(finalRes);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

export async function sendChatToUser(req: Request, res: Response) {
  try {
    const userId = req.body.id;
    const { message, reviewId, productId } = req.body;
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
    const Object: any = {
      reviewId: reviewId,
      userId: userId,
      name: response.name,
      message: message,
    };
    client?.publish(`chat/reviewer/${reviewId}`, Object);
    res.status(HttpStatusCode.CREATED).send("Chat sent By reviewer Side");
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
