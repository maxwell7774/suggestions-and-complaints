import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Message, User } from "@prisma/client";
import { format } from "date-fns";
import React, { ReactElement } from "react";
import { Option } from "@/components/multi-select";

interface Props {
  reportColumns: Option[];
  messages: (Message & { sender: User })[];
}

const GeneratedReport = React.forwardRef<React.ElementRef<"div">, Props>(
  ({ reportColumns, messages }: Props, ref) => {
    return (
      <div ref={ref} className="p-5">
        <h2 className="text-center text-xl font-semibold mb-3">
          Messages Report
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              {reportColumns.map((option) => (
                <TableHead key={option.value}>{option.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                {reportColumns.map((option) => (
                  <TableCell key={option.label + "R"}>
                    {option.value === "id" && message.id}
                    {option.value === "subject" && message.subject}
                    {option.value === "messageBody" && message.messageBody}
                    {option.value === "messageType" &&
                      (message.messageType === "COMPLAINT"
                        ? "Complaint"
                        : "Suggestion")}
                    {option.value === "dateCreated" &&
                      format(new Date(message.dateCreated), "PPpp")}
                    {option.value === "sender" &&
                      (message.sender ? message.sender.name : "Anonymous")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
);

GeneratedReport.displayName = "GeneratedReport";

export default GeneratedReport;
