import { User as PrismaUser } from "@prisma/client";

export enum Role {
  USER,
  REVIEWER,
  ADMIN,
}

export class User {
  private id: string;
  private name: string;
  private email: string;
  private imageUrl: string;
  private role: Role;
  private complaintRecipient: boolean;
  private suggestionRecipient: boolean;

  constructor(
    id: string,
    name: string,
    email: string,
    imageUrl: string,
    role: Role,
    complaintRecipient: boolean,
    suggestionRecipient: boolean
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.imageUrl = imageUrl;
    this.role = role;
    this.complaintRecipient = complaintRecipient;
    this.suggestionRecipient = suggestionRecipient;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getImageUrl(): string {
    return this.imageUrl;
  }

  public getRole(): Role {
    return this.role;
  }

  public isComplaintRecipient(): boolean {
    return this.complaintRecipient;
  }

  public isSuggestionRecipient(): boolean {
    return this.suggestionRecipient;
  }

  public static prismaMapToUser(prismaUser: PrismaUser): User {
    let role = Role.USER;

    if (prismaUser.role === "REVIEWER") {
      role = Role.REVIEWER;
    }
    if (prismaUser.role === "ADMIN") {
      role = Role.ADMIN;
    }

    return new User(
      prismaUser.id,
      prismaUser.name ? prismaUser.name : "(No Name)",
      prismaUser.email ? prismaUser.email : "(No Email)",
      prismaUser.image ? prismaUser.image : "(No Image)",
      role,
      prismaUser.complaintRecipient,
      prismaUser.suggestionRecipient
    );
  }
}
