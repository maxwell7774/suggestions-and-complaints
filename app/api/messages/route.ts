import PagedList from "@/lib/paged-list";
import { prismaClient } from "@/prisma-client";
import { Message } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface SearchParams {
  page: number;
  pageSize: number;
  sortDir: "asc" | "desc";
  sortCol: string;
  searchTerm: string;
  searchCol: string;
}

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

export async function GET(request: NextRequest) {
  const { page, pageSize, searchCol, searchTerm, sortCol, sortDir } =
    parseSearchParams(request.nextUrl.searchParams);

  let messages = await prismaClient.message.findMany({
    where: { [searchCol]: { contains: searchTerm } },
    orderBy: [{ [sortCol]: sortDir }, { id: sortDir }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  let totalCount: number = await prismaClient.message.count({
    where: { [searchCol]: { contains: searchTerm } },
  });

  const data: PagedList<Message> = {
    items: messages,
    totalCount: totalCount,
    hasNextPage: page * pageSize < totalCount,
    hasPreviousPage: page > 1,
  };

  return NextResponse.json(data, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

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

  return NextResponse.json({ message: message }, { status: 200 });
}
