"use client";
import { Complaint } from "@/classes/message/complaint";
import { Message } from "@/classes/message/message";
import { Suggestion } from "@/classes/message/suggestion";
import {
  Datatable,
  DatatableBody,
  DatatableCell,
  DatatableHead,
  DatatableHeader,
  DatatableHeaderRow,
  DatatablePageSizeSelect,
  DatatablePagination,
  DatatableRow,
  DatatableSearchInput,
} from "@/components/react-server-datatables";
import { useDatatable } from "@/components/react-server-datatables/hooks/use-datatable";
import { Card } from "@/components/ui/card";
import { Message as PrismaMessage } from "@prisma/client";
import Link from "next/link";
import SkeletonRows from "./skeleton-rows";

//Messages datatable that allows for searching and paginating messages send in by the user
//Where I'm using typescript and trying to provide examples of inheritance using class,
//it isn't the most elegant solution converting from the prisma messages object to the
//classes I made, but it should fulfill the requirement
const MessagesDatatable = () => {
  //Sends the api url and primary key of the table/data that we would like to retrieve
  const {
    datatableParams, //The datatable params that allow for searching, pagination, and updating the query keys
    query: { data, isPlaceholderData }, //The data returned from the backend and is placeholder data from the keep previous data as paginating
    setDatatableParams, //Allows for updating the datatableParams and calling for new data from the server
  } = useDatatable<PrismaMessage>({
    //Hook for retrieving all the above information
    apiUrl: "/api/messages", //backend endpoint
    primaryKeyProperty: "id", //primary key for the data
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
      <DatatableSearchInput
        className="w-full"
        datatableParams={datatableParams}
        setDatatableParams={setDatatableParams}
      />
      <Card>
        <Datatable>
          <DatatableHeader>
            <DatatableHeaderRow>
              <DatatableHead
                className="hidden md:table-cell"
                propertyName={"id"}
                datatableParams={datatableParams}
                setDatatableParams={setDatatableParams}
                isSearchable={true}
              >
                Id
              </DatatableHead>
              <DatatableHead
                className="hidden sm:table-cell"
                propertyName={"messageType"}
                datatableParams={datatableParams}
                setDatatableParams={setDatatableParams}
              >
                Message Type
              </DatatableHead>
              <DatatableHead
                propertyName={"subject"}
                datatableParams={datatableParams}
                setDatatableParams={setDatatableParams}
                isSearchable={true}
              >
                Subject
              </DatatableHead>
              <DatatableHead
                className="hidden sm:table-cell"
                propertyName={"dateCreated"}
                datatableParams={datatableParams}
                setDatatableParams={setDatatableParams}
              >
                Date Created
              </DatatableHead>
              <DatatableHead
                className="hidden md:table-cell"
                propertyName={"dateUpdated"}
                datatableParams={datatableParams}
                setDatatableParams={setDatatableParams}
              >
                Date Updated
              </DatatableHead>
            </DatatableHeaderRow>
          </DatatableHeader>
          <DatatableBody>
            {/* If there are messages, render the datatable rows */}
            {messages ? (
              messages.map((message) => (
                <DatatableRow key={message.getId()} rowdata={message}>
                  <DatatableCell className="hidden md:table-cell">
                    {message.getId()}
                  </DatatableCell>
                  <DatatableCell className="hidden sm:table-cell">
                    {(message as Complaint) ? "Complaint" : "Suggestion"}
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
            ) : (
              // If there are no messages then render skeleton
              <SkeletonRows rows={datatableParams.pageSize} cols={5} />
            )}
          </DatatableBody>
        </Datatable>
      </Card>
      <div className="flex w-full justify-end space-x-5">
        <DatatablePageSizeSelect
          datatableParams={datatableParams}
          setDatatableParams={setDatatableParams}
          pageSizes={[1, 3, 5, 10, 20, 50]}
        />
        <DatatablePagination
          datatableParams={datatableParams}
          setDatatableParams={setDatatableParams}
          isPlaceholderData={isPlaceholderData}
          hasNextPage={data ? data.hasNextPage : false}
          hasPreviousPage={data ? data.hasPreviousPage : false}
          totalCount={data ? data.totalCount : 0}
        />
      </div>
    </div>
  );
};

export default MessagesDatatable;
