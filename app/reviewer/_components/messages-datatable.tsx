"use client";
import { Complaint } from "@/classes/message/complaint";
import { Message } from "@/classes/message/message";
import { Suggestion } from "@/classes/message/suggestion";
import {
  Datatable,
  DatatableBody,
  DatatableCell,
  DatatableColumnSearch,
  DatatableHead,
  DatatableHeader,
  DatatableHeaderRow,
  DatatablePageSizeSelect,
  DatatablePagination,
  DatatableRoot,
  DatatableRow,
  DatatableSearchInput,
} from "@/components/react-server-datatables";
import { useDatatable } from "@/components/react-server-datatables/hooks/use-datatable";
import { Message as PrismaMessage } from "@prisma/client";
import Link from "next/link";
import SkeletonRows from "./skeleton-rows";
import schema from "@/app/user/_schemas/message-form-schema";

//Messages datatable that allows for searching and paginating messages send in by the user
//Where I'm using typescript and trying to provide examples of inheritance using class,
//it isn't the most elegant solution converting from the prisma messages object to the
//classes I made, but it should fulfill the requirement
const MessagesDatatable = () => {
  //Sends the api url and primary key of the table/data that we would like to retrieve
  const {
    query: { data, isPlaceholderData },
    datatable,
  } = useDatatable<PrismaMessage>({
    apiUrl: "/api/messages",
    primaryKeyField: "id",
    zodSchema: schema,
  });

  //Sets up the Message array so that I can convert the prisma messages to my class messages
  let messages: Message[] | null = null;

  //if there is data convert the messages
  if (data) {
    messages = data.items.map((message) => {
      if (message.messageType === "COMPLAINT") {
        return Complaint.prismaMapToComplaint(message, [], []);
      }
      return Suggestion.prismaMapToSuggestion(message, undefined, [], []);
    });
  }

  return (
    <div className="flex flex-col space-y-2">
      <DatatableSearchInput className="w-full" datatable={datatable} />
      <DatatableRoot>
        <DatatableHeader>
          <DatatableHeaderRow>
            <DatatableHead
              className="hidden md:table-cell"
              propertyName={"id"}
              datatable={datatable}
              title={"Id"}
            >
              <DatatableColumnSearch
                propertyName={"id"}
                datatable={datatable}
              />
            </DatatableHead>
            <DatatableHead
              className="hidden sm:table-cell"
              propertyName={"messageType"}
              datatable={datatable}
              title="Message Type"
            />
            <DatatableHead
              propertyName={"subject"}
              datatable={datatable}
              title="Subject"
            >
              <DatatableColumnSearch
                propertyName="subject"
                datatable={datatable}
              />
            </DatatableHead>
            <DatatableHead
              className="hidden sm:table-cell"
              propertyName={"dateCreated"}
              datatable={datatable}
              title="Created"
            />
            <DatatableHead
              className="hidden md:table-cell"
              propertyName={"dateUpdated"}
              title="Updated"
              datatable={datatable}
            />
          </DatatableHeaderRow>
        </DatatableHeader>
        <DatatableBody>
          {
            messages
              ? messages.map((message) => (
                  <DatatableRow key={message.getId()} rowdata={message}>
                    <DatatableCell className="hidden md:table-cell">
                      {message.getId()}
                    </DatatableCell>
                    <DatatableCell className="hidden sm:table-cell">
                      {(message as Suggestion) ? "Suggestion" : "Complaint"}
                    </DatatableCell>
                    <DatatableCell>
                      <Link
                        className="hover:text-neutral-500 underline transition-colors"
                        href={`/reviewer/${message.getId()}`}
                      >
                        {message.getSubject()}
                      </Link>
                    </DatatableCell>
                    <DatatableCell className="hidden sm:table-cell">
                      {message.getDateCreated().toLocaleString()}
                    </DatatableCell>
                    <DatatableCell className="hidden md:table-cell">
                      {message.getDateUpdated().toLocaleString()}
                    </DatatableCell>
                  </DatatableRow>
                ))
              : null
            // <SkeletonRows rows={datatable.pageSize} cols={5} />
          }
        </DatatableBody>
      </DatatableRoot>
      <div className="flex w-full justify-end space-x-5">
        <DatatablePageSizeSelect
          datatable={datatable}
          pageSizes={[1, 3, 5, 10, 20, 50]}
        />
        <DatatablePagination
          datatable={datatable}
          isPlaceholderData={isPlaceholderData}
          data={data}
        />
      </div>
    </div>
  );
};

export default MessagesDatatable;
