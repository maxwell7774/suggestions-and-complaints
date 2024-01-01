import { auth } from "@/auth";
import isAuthorized from "@/lib/is-authorized";
import { prismaClient } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const body = await request.json();

  if (!body.messageId) {
    return NextResponse.json(
      { error: "No message id provided" },
      { status: 400 }
    );
  }

  const messageComments = await prismaClient.messageComment.findMany({
    where: { messageId: body.messageId },
  });

  return NextResponse.json(messageComments, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const authorizedRoles = ["REVIEWER", "ADMIN"];

  if (!isAuthorized(session, authorizedRoles)) {
    return NextResponse.json(
      { error: "You are unauthorized" },
      { status: 403 }
    );
  }

  const body = await request.json();

  const messageComment = await prismaClient.messageComment.create({
    data: {
      messageId: body.messageId,
      commenterId: body.commenterId,
      comment: body.comment,
    },
  });

  return NextResponse.json(messageComment, { status: 200 });
}
