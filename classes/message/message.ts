import { MessageComment } from "../message-comment";
import { User } from "../user";

export enum MessageType {
  COMPLAINT,
  SUGGESTION,
}

export abstract class Message {
  private id: string;
  private subject: string;
  private messageBody: string;
  private messageType: MessageType;
  private dateCreated: Date;
  private dateUpdated: Date;
  private comments: MessageComment[] | undefined;
  private recipients: User[] | undefined;

  constructor(
    id: string,
    subject: string,
    messageBody: string,
    messageType: MessageType,
    dateCreated: Date,
    dateUpdated: Date,
    comments?: MessageComment[],
    recipients?: User[]
  ) {
    this.id = id;
    this.subject = subject;
    this.messageBody = messageBody;
    this.messageType = messageType;
    this.dateCreated = dateCreated;
    this.dateUpdated = dateUpdated;
    this.comments = comments ? comments : undefined;
    this.recipients = recipients ? recipients : undefined;
  }

  public getId(): string {
    return this.id;
  }

  public getSubject(): string {
    return this.subject;
  }

  public getMessageBody(): string {
    return this.messageBody;
  }

  public getMessageType(): MessageType {
    return this.messageType;
  }

  public getDateCreated(): Date {
    return this.dateCreated;
  }

  public getDateUpdated(): Date {
    return this.dateUpdated;
  }

  public getComments(): MessageComment[] | undefined {
    return this.comments;
  }

  public getRecipients(): User[] | undefined {
    return this.recipients;
  }

  public getCommentsByCommenterId(commenterId: string): MessageComment[] {
    if (this.comments) {
      return this.comments.filter(
        (comment: MessageComment) =>
          comment.getCommenter().getId() === commenterId
      );
    }
    return [];
  }
}
