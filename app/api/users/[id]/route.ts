import isAuthorized from "@/lib/is-authorized";
import { auth } from "@/auth";
import { prismaClient } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prismaClient.user.findUnique({ where: { id: params.id } });
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const authorizedRoles = ["ADMIN"];

  if (!isAuthorized(session, authorizedRoles)) {
    return NextResponse.json(
      { error: "You are not authorized." },
      { status: 403 }
    );
  }

  const body = await request.json();
  const user = await prismaClient.user.findUnique({ where: { id: params.id } });

  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const updatedUser = await prismaClient.user.update({
    where: { id: user.id },
    data: {
      role: body.role,
      suggestionRecipient: body.suggestionRecipient,
      complaintRecipient: body.complaintRecipient,
    },
  });

  return NextResponse.json(updatedUser, { status: 201 });
}
