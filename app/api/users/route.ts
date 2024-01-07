import { prismaClient } from "@/prisma-client";
import { NextRequest, NextResponse } from "next/server";

//Gets all users from the db
export async function GET(request: NextRequest) {
  //Retrieves all users
  const users = await prismaClient.user.findMany();

  //Sends whatever users it finds
  return NextResponse.json(users, { status: 200 });
}
