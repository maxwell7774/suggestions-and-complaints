import isAuthorized from "@/lib/is-authorized";
import { auth } from "@/auth";
import { prismaClient } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await prismaClient.user.findMany();
  return NextResponse.json(users, { status: 200 });
}
