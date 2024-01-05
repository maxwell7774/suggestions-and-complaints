import isAuthorized from "@/lib/is-authorized";
import { auth } from "@/auth";
import { prismaClient } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const messageComment = await prismaClient.messageComment.findUnique({
    where: { id: params.id },
    include: { commenter: true },
  });
  if (!messageComment) {
    return NextResponse.json(
      { error: "Message comment not found." },
      { status: 404 }
    );
  }

  return NextResponse.json(messageComment, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const authorizedRoles = ["REVIEWER", "ADMIN"];

  if (!isAuthorized(session, authorizedRoles)) {
    return NextResponse.json(
      { error: "You are not authorized." },
      { status: 403 }
    );
  }

  const body = await request.json();
  const messageComment = await prismaClient.messageComment.findUnique({
    where: { id: params.id },
  });

  if (!messageComment) {
    return NextResponse.json(
      { error: "Message comment not found." },
      { status: 404 }
    );
  }

  const updatedMessageComment = await prismaClient.messageComment.update({
    where: { id: messageComment.id },
    data: {
      comment: body.comment,
    },
  });

  return NextResponse.json(updatedMessageComment, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const messageComment = await prismaClient.messageComment.findUnique({
    where: { id: params.id },
  });

  if (!messageComment) {
    return NextResponse.json(
      { error: "Message comment not found." },
      { status: 404 }
    );
  }

  await prismaClient.messageComment.delete({
    where: { id: messageComment.id },
  });

  return NextResponse.json({ message: "Delete successful." }, { status: 202 });
}
