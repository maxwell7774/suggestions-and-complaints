import { SearchFilter } from "@/components/react-server-datatables";
import PagedList from "@/lib/paged-list";
import { prismaClient } from "@/prisma-client";
import { Message } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface SearchParams {
  page: number;
  pageSize: number;
  sortBy: string;
  sortDir: "asc" | "desc";
  searchTerm: string;
  searchFields: string[],
  searchFilters: SearchFilter[]
}

const parseSearchParams = (searchParams: URLSearchParams): SearchParams => {
  return {
    page: Number(searchParams.get("page")),
    pageSize: Number(searchParams.get("pageSize")),
    sortBy: searchParams.get("sortBy") ?? "",
    sortDir: searchParams.get("sortDir") === "desc" ? "desc" : "asc",
    searchTerm: searchParams.get("searchTerm") ?? "",
    searchFields: searchParams.get("searchFields") ? JSON.parse(searchParams.get("searchFields")!) : [],
    searchFilters: searchParams.get("searchFilters") ? JSON.parse(searchParams.get("searchFilters")!) : [],
  };
};

export async function GET(request: NextRequest) {
  const { page, pageSize, sortBy, sortDir, searchTerm, searchFields, searchFilters } =
    parseSearchParams(request.nextUrl.searchParams);

  let where = {};

  if(searchFields.length > 0 && searchTerm){
    let OR: any[] = [];
    searchFields.forEach(searchField => {
      OR.push({[searchField]: {contains: searchTerm}})
    });
    where = {OR: OR}
  }
  else{
    where = {OR: [{id: {contains: searchTerm}}, {subject: {contains: searchTerm}}]}
  }

  let messages = await prismaClient.message.findMany({
    where: where,
    orderBy: [{ [sortBy]: sortDir }, { id: sortDir }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  let totalCount: number = await prismaClient.message.count({
    where: where,
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
