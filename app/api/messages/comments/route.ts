import { auth } from "@/auth";
import isAuthorized from "@/lib/is-authorized";
import { prismaClient } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";

//Gets all comments for a messageId
export async function GET(request: NextRequest) {
  const session = await auth();
  const authorizedRoles = ["REVIEWER", "ADMIN"];

  //Checks to see if the user has the permissions to update the comment
  if (!isAuthorized(session, authorizedRoles)) {
    return NextResponse.json(
      { error: "You are not authorized." },
      { status: 403 }
    );
  }

  //Parses the request body to json
  const body = await request.json();

  //If there is no messageId to retrieve the comments for then return an error
  if (!body.messageId) {
    return NextResponse.json(
      { error: "No message id provided" },
      { status: 400 }
    );
  }

  //Prisma retrieves the comments for that messageId
  const messageComments = await prismaClient.messageComment.findMany({
    where: { messageId: body.messageId },
  });

  //Returns the comments for the specified messageId
  return NextResponse.json(messageComments, { status: 200 });
}

//Posts a new comment
export async function POST(request: NextRequest) {
  const session = await auth();
  const authorizedRoles = ["REVIEWER", "ADMIN"];

  //Checks for authorization
  if (!isAuthorized(session, authorizedRoles)) {
    return NextResponse.json(
      { error: "You are unauthorized" },
      { status: 403 }
    );
  }

  //Parses request body
  const body = await request.json();

  //Prisma adds the comment to the db
  const messageComment = await prismaClient.messageComment.create({
    data: {
      messageId: body.messageId,
      commenterId: body.commenterId,
      comment: body.comment,
    },
  });

  //Returns the new comment with created id
  return NextResponse.json(messageComment, { status: 200 });
}
