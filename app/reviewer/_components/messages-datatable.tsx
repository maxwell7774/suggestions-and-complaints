"use client";
import {
  Datatable,
  DatatableBody,
  DatatableCell,
  DatatableColumnCategorySelect,
  DatatableColumnDatePicker,
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
import { Message } from "@prisma/client";
import Link from "next/link";
import SkeletonRows from "./skeleton-rows";
import schema from "@/app/user/_schemas/message-form-schema";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

//Messages datatable that allows for searching and paginating messages send in by the user
//Where I'm using typescript and trying to provide examples of inheritance using class,
//it isn't the most elegant solution converting from the prisma messages object to the
//classes I made, but it should fulfill the requirement
const MessagesDatatable = () => {
  //Sends the api url and primary key of the table/data that we would like to retrieve
  const {
    query: { data: messages, isPlaceholderData },
    datatable,
  } = useDatatable<Message>({
    apiUrl: "/api/messages",
    primaryKeyField: "id",
    zodSchema: schema,
  });

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
            >
              <DatatableColumnCategorySelect
                propertyName={"messageType"}
                datatable={datatable}
                values={[
                  { label: "Suggestion", value: "SUGGESTION" },
                  { label: "Complaint", value: "COMPLAINT" },
                ]}
              />
            </DatatableHead>
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
            >
              <DatatableColumnDatePicker
                propertyName={"dateCreated"}
                datatable={datatable}
              />
            </DatatableHead>
          </DatatableHeaderRow>
        </DatatableHeader>
        <DatatableBody>
          {
            messages
              ? messages.items.map((message) => (
                  <DatatableRow key={message.id} rowdata={message}>
                    <DatatableCell className="hidden md:table-cell">
                      {message.id}
                    </DatatableCell>
                    <DatatableCell className="hidden sm:table-cell">
                      {message.messageType === "SUGGESTION"
                        ? "Suggestion"
                        : "Complaint"}
                    </DatatableCell>
                    <DatatableCell>
                      <Link
                        className="hover:text-neutral-500 underline transition-colors"
                        href={`/reviewer/${message.id}`}
                      >
                        {message.subject}
                      </Link>
                    </DatatableCell>
                    <DatatableCell className="hidden sm:table-cell">
                      {format(new Date(message.dateCreated), "PPpp")}
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
          data={messages}
        />
      </div>
    </div>
  );
};

export default MessagesDatatable;
