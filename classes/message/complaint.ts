import { MessageComment } from "../message-comment";
import { User } from "../user";
import { Message } from "./message";
import { Message as PrismaMessage } from "@prisma/client";

export class Complaint extends Message {
  constructor(
    id: string,
    subject: string,
    messageBody: string,
    dateCreated: Date,
    dateUpdated: Date,
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
  }

  public static prismaMapToComplaint(
    prismaMessage: PrismaMessage,
    comments: MessageComment[],
    recipients: User[]
  ): Complaint {
    return new Complaint(
      prismaMessage.id,
      prismaMessage.subject,
      prismaMessage.messageBody,
      prismaMessage.dateCreated,
      prismaMessage.dateUpdated,
      comments,
      recipients
    );
  }
}
