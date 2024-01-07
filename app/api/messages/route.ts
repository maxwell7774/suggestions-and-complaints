import { auth } from "@/auth";
import isAuthorized from "@/lib/is-authorized";
import PagedList from "@/lib/paged-list";
import { prismaClient } from "@/prisma-client";
import { Message } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

//Shape of the search parameters
interface SearchParams {
  page: number;
  pageSize: number;
  sortDir: "asc" | "desc";
  sortCol: string;
  searchTerm: string;
  searchCol: string;
}

//Parses search parameters
const parseSearchParams = (searchParams: URLSearchParams): SearchParams => {
  return {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
    sortDir: searchParams.get("sortDir") === "desc" ? "desc" : "asc",
    sortCol: searchParams.get("sortCol") || "id",
    searchTerm: searchParams.get("searchTerm") || "",
    searchCol: searchParams.get("searchCol") || "",
  };
};

//Gets all messages based on search params
export async function GET(request: NextRequest) {
  const session = await auth();
  const authorizedRoles = ["REVIEWER", "ADMIN"];

  //Checks to see if the user is authorized
  if (!isAuthorized(session, authorizedRoles)) {
    return NextResponse.json(
      { error: "You are not authorized." },
      { status: 403 }
    );
  }

  //Parses the search params
  const { page, pageSize, searchCol, searchTerm, sortCol, sortDir } =
    parseSearchParams(request.nextUrl.searchParams);

  //Gets the messages based on the search params
  let messages = await prismaClient.message.findMany({
    where: { [searchCol]: { contains: searchTerm } },
    orderBy: [{ [sortCol]: sortDir }, { id: sortDir }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  //Gets the total count of the messages for that search term
  //Gets the total count of all messages if search term is empty
  let totalCount: number = await prismaClient.message.count({
    where: { [searchCol]: { contains: searchTerm } },
  });

  //Wraps the messages into a Paged List used for pagination on the frontend
  const data: PagedList<Message> = {
    items: messages,
    totalCount: totalCount,
    hasNextPage: page * pageSize < totalCount,
    hasPreviousPage: page > 1,
  };

  //Sends the wrapped messages
  return NextResponse.json(data, { status: 200 });
}

//Creates a new message
//No authorization as anyone can send a message
//Authentication is handled by the middleware
export async function POST(request: NextRequest) {
  //parses the body to json
  const body = await request.json();

  //Creates the new message
  const message = await prismaClient.message.create({
    data: {
      messageType: body.messageType,
      subject: body.subject,
      messageBody: body.messageBody,
      senderId: body.senderId,
      recipients: {
        createMany: {
          data: body.recipients.map((recipientId: string) => {
            return { recipientId: recipientId };
          }),
        },
      },
    },
  });

  //Sends the created message with the new id
  return NextResponse.json({ message: message }, { status: 200 });
}
