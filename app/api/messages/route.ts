import { SearchFilter } from "@/components/react-server-datatables";
import PagedList from "@/lib/paged-list";
import { prismaClient } from "@/prisma-client";
import { Message, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

//Shape of the search parameters
interface SearchParams {
  page: number;
  pageSize: number;
  sortBy: string;
  sortDir: "asc" | "desc";
  searchTerm: string;
  searchFields: string[];
  searchFilters: SearchFilter[];
}

//Parses search parameters
const parseSearchParams = (searchParams: URLSearchParams): SearchParams => {
  return {
    page: Number(searchParams.get("page")) ?? 0,
    pageSize: Number(searchParams.get("pageSize")) ?? 0,
    sortBy: searchParams.get("sortBy") ?? "",
    sortDir: searchParams.get("sortDir") === "desc" ? "desc" : "asc",
    searchTerm: searchParams.get("searchTerm") ?? "",
    searchFields: searchParams.get("searchFields")
      ? JSON.parse(searchParams.get("searchFields")!)
      : [],
    searchFilters: searchParams.get("searchFilters")
      ? JSON.parse(searchParams.get("searchFilters")!)
      : [],
  };
};

//Gets all messages based on search params
export async function GET(request: NextRequest) {
  const {
    page,
    pageSize,
    sortBy,
    sortDir,
    searchTerm,
    searchFields,
    searchFilters,
  } = parseSearchParams(request.nextUrl.searchParams);

  let query = {};
  let skip = {};
  let take = {};
  let where: Prisma.MessageWhereInput = {};
  let AND: any[] = [];
  let searchFieldsQuery: any[] = [];
  let searchFiltersQuery: any[] = [];

  if (page !== 0 && pageSize !== 0) {
    skip = (page - 1) * pageSize;
    take = pageSize;
  }

  if (searchFields.length > 0 && searchTerm) {
    searchFields.forEach((searchField) => {
      searchFieldsQuery.push({ [searchField]: { contains: searchTerm } });
    });
  } else {
    searchFieldsQuery = [
      { id: { contains: searchTerm } },
      { subject: { contains: searchTerm } },
    ];
  }

  if (searchFieldsQuery) {
    AND.push({ OR: searchFieldsQuery });
    where = { AND: [{ OR: searchFieldsQuery }] };
  }

  if (searchFilters.length > 0) {
    let eqFilters = searchFilters.filter((filter) => filter.operator === "eq");
    let lteFilters = searchFilters.filter(
      (filter) => filter.operator === "lte"
    );
    let gteFilters = searchFilters.filter(
      (filter) => filter.operator === "gte"
    );

    if (eqFilters.length > 0) {
      eqFilters.forEach(({ field, value }) => {
        if (field === "dateCreated") {
          let date = new Date(value);
          date.setHours(date.getHours() + 31);
          AND.push({ [field]: { lte: date } });
          AND.push({ [field]: { gte: new Date(value) } });
        } else {
          searchFiltersQuery.push({ [field]: { equals: value } });
        }
      });
    }
    if (lteFilters.length > 0) {
      lteFilters.forEach(({ field, value }) => {
        let date = new Date(value);
        date.setHours(date.getHours() + 31);
        AND.push({ [field]: { lte: date } });
      });
    }
    if (gteFilters.length > 0) {
      gteFilters.forEach(({ field, value }) =>
        AND.push({ [field]: { gte: new Date(value) } })
      );
    }
  }

  if (searchFiltersQuery) {
    AND.push({ OR: searchFiltersQuery });
    where = { ...where, AND: AND };
  }

  if (where) {
    query = { where: where };
  }

  if (skip && take) {
    query = { ...query, skip: skip, take: take };
  }

  query = { ...query, orderBy: [{ [sortBy]: sortDir }, { id: sortDir }] };

  // let messages1 = await prismaClient.message.findMany({where: {AND:[{id: }]}})

  let messages = await prismaClient.message.findMany(query);

  //Gets the total count of the messages for that search term
  //Gets the total count of all messages if search term is empty
  let totalCount: number = await prismaClient.message.count({
    where: where,
  });

  //Wraps the messages into a Paged List used for pagination on the frontend
  const data: PagedList<Message> = {
    items: messages,
    totalCount: totalCount,
    hasNextPage: page * pageSize < totalCount,
    hasPreviousPage: page > 1,
    page: page,
    pageSize: pageSize,
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
