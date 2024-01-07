import isAuthorized from "@/lib/is-authorized";
import { auth } from "@/auth";
import { prismaClient } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";

//Gets user by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //Prisma retrieves the user by id
  const user = await prismaClient.user.findUnique({ where: { id: params.id } });

  //Sends error if no user is found
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  //Sends user back if user is found
  return NextResponse.json(user, { status: 200 });
}

//Updates a user by id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const authorizedRoles = ["ADMIN"];

  //Checks to see if user is authorized to make changes to another uesr
  if (!isAuthorized(session, authorizedRoles)) {
    return NextResponse.json(
      { error: "You are not authorized." },
      { status: 403 }
    );
  }

  //Parses the request body
  const body = await request.json();

  //Checks to see if there is a user with that id
  const user = await prismaClient.user.findUnique({ where: { id: params.id } });

  //If no user is found with that id then send back an error
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  //Update and return the updated user
  const updatedUser = await prismaClient.user.update({
    where: { id: user.id },
    data: {
      role: body.role,
      suggestionRecipient: body.suggestionRecipient,
      complaintRecipient: body.complaintRecipient,
    },
  });

  //Send the updated user back to the client
  return NextResponse.json(updatedUser, { status: 201 });
}
