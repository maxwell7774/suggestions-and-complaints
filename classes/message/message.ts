import { MessageComment } from "../message-comment";
import { User } from "../user";

export abstract class Message {
  private id: string;
  private subject: string;
  private messageBody: string;
  private dateCreated: Date;
  private dateUpdated: Date;
  private comments: MessageComment[];
  private recipients: User[];

  constructor(
    id: string,
    subject: string,
    messageBody: string,
    dateCreated: Date,
    dateUpdated: Date,
    comments: MessageComment[],
    recipients: User[]
  ) {
    this.id = id;
    this.subject = subject;
    this.messageBody = messageBody;
    this.dateCreated = dateCreated;
    this.dateUpdated = dateUpdated;
    this.comments = comments;
    this.recipients = recipients;
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

  public getDateCreated(): Date {
    return this.dateCreated;
  }

  public getDateUpdated(): Date {
    return this.dateUpdated;
  }

  public getComments(): MessageComment[] {
    return this.comments;
  }

  public getRecipients(): User[] {
    return this.recipients;
  }

  public getCommentsByCommenterId(commenterId: string): MessageComment[] {
    return this.comments.filter(
      (comment: MessageComment) =>
        comment.getCommenter().getId() === commenterId
    );
  }
}
