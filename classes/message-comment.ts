import { User } from "./user";
import { MessageComment as PrismaMessageComment } from "@prisma/client";

export class MessageComment {
  private id: string;
  private commentMessage: string;
  private dateCreated: Date;
  private dateUpdated: Date;
  private commenter: User;

  constructor(
    id: string,
    commentMessage: string,
    dateCreated: Date,
    dateUpdated: Date,
    commenter: User
  ) {
    this.id = id;
    this.commentMessage = commentMessage;
    this.dateCreated = dateCreated;
    this.dateUpdated = dateUpdated;
    this.commenter = commenter;
  }

  public getId(): string {
    return this.id;
  }

  public getCommentMessage(): string {
    return this.commentMessage;
  }

  public getDateCreated(): Date {
    return this.dateCreated;
  }

  public getDateUpdated(): Date {
    return this.dateUpdated;
  }

  public getCommenter(): User {
    return this.commenter;
  }

  public static prismaMapToComment(
    prismaMessageComment: PrismaMessageComment,
    commenter: User
  ): MessageComment {
    return new MessageComment(
      prismaMessageComment.id,
      prismaMessageComment.comment,
      prismaMessageComment.dateCreated,
      prismaMessageComment.lastUpdated,
      commenter
    );
  }
}
