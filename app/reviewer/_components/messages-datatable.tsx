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

const MessagesDatatable = () => {
  const {
    datatableParams,
    editMode,
    query: { data, isPlaceholderData },
    setDatatableParams,
    setEditMode,
  } = useDatatable<PrismaMessage>({
    apiUrl: "/api/messages",
    primaryKeyProperty: "id",
  });

  let messages: Message[] | null = null;

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
            {messages ? (
              messages.map((message) => (
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
            ) : (
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
