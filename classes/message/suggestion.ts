import { MessageComment } from "../message-comment";
import { User } from "../user";
import { Message } from "./message";
import { Message as PrismaMessage } from "@prisma/client";

export class Suggestion extends Message {
  private sender: User;

  constructor(
    id: string,
    subject: string,
    messageBody: string,
    dateCreated: Date,
    dateUpdated: Date,
    sender: User,
    comments: MessageComment[],
    recipients: User[]
  ) {
    super(
      id,
      subject,
      messageBody,
      dateCreated,
      dateUpdated,
      comments,
      recipients
    );
    this.sender = sender;
  }

  public getSender(): User {
    return this.sender;
  }

  public static prismaMapToSuggestion(
    prismaMessage: PrismaMessage,
    sender: User,
    comments: MessageComment[],
    recipients: User[]
  ): Suggestion {
    return new Suggestion(
      prismaMessage.id,
      prismaMessage.subject,
      prismaMessage.messageBody,
      prismaMessage.dateCreated,
      prismaMessage.dateUpdated,
      sender,
      comments,
      recipients
    );
  }
}
