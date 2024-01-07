import isAuthorized from "@/lib/is-authorized";
import { auth } from "@/auth";
import { prismaClient } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";

//Backend endpoint for comments by id
//Gets comment by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const authorizedRoles = ["REVIEWER", "ADMIN"];

  //Checks to see if the user has the permissions to update the comment
  if (!isAuthorized(session, authorizedRoles)) {
    return NextResponse.json(
      { error: "You are not authorized." },
      { status: 403 }
    );
  }

  //Tries to get the comment using prisma
  const messageComment = await prismaClient.messageComment.findUnique({
    where: { id: params.id },
    include: { commenter: true },
  });

  //If no comment is found, then an error is returned
  if (!messageComment) {
    return NextResponse.json(
      { error: "Message comment not found." },
      { status: 404 }
    );
  }

  //Returns the comment
  return NextResponse.json(messageComment, { status: 200 });
}

//Updates comment by id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

  //Tries to retrieve the comment by id
  const messageComment = await prismaClient.messageComment.findUnique({
    where: { id: params.id },
  });

  //If there is no comment by that id, then return an error
  if (!messageComment) {
    return NextResponse.json(
      { error: "Message comment not found." },
      { status: 404 }
    );
  }

  //Update that comment using prisma
  const updatedMessageComment = await prismaClient.messageComment.update({
    where: { id: messageComment.id },
    data: {
      comment: body.comment,
    },
  });

  //Return the updated commment
  return NextResponse.json(updatedMessageComment, { status: 201 });
}

//Deletes comments by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const authorizedRoles = ["REVIEWER", "ADMIN"];

  //Checks to see if the user has the permissions to update the comment
  if (!isAuthorized(session, authorizedRoles)) {
    return NextResponse.json(
      { error: "You are not authorized." },
      { status: 403 }
    );
  }

  //Checks if comment for that id exists
  const messageComment = await prismaClient.messageComment.findUnique({
    where: { id: params.id },
  });

  //Returns error if comment does exist
  if (!messageComment) {
    return NextResponse.json(
      { error: "Message comment not found." },
      { status: 404 }
    );
  }

  //Attemps to delete the comment
  await prismaClient.messageComment.delete({
    where: { id: messageComment.id },
  });

  //Returns success
  return NextResponse.json({ message: "Delete successful." }, { status: 202 });
}
