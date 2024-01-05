import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prismaClient } from "@/prisma-client";
import { Message as PrismaMessage } from "@prisma/client";
import { Complaint } from "@/classes/message/complaint";
import { Suggestion } from "@/classes/message/suggestion";
import { Message } from "@/classes/message/message";
import Link from "next/link";
import React from "react";
import { User } from "@/classes/user";
import { MessageComment } from "@/classes/message-comment";

const ReviewerPage = async () => {
  const messages: Message[] = (
    await prismaClient.message.findMany({
      include: {
        comments: { include: { commenter: true } },
        recipients: true,
        sender: true,
      },
    })
  ).map((message: any) => {
    if (message.messageType === "COMPLAINT") {
      return Complaint.prismaMapToComplaint(
        message,
        message.comments.map((comment: any) =>
          MessageComment.prismaMapToComment(comment, comment.commenter)
        ),
        message.recipients.map((recipient: any) =>
          User.prismaMapToUser(recipient)
        )
      );
    }
    return Suggestion.prismaMapToSuggestion(
      message,
      User.prismaMapToUser(message.sender),
      message.comments.map((comment: any) =>
        MessageComment.prismaMapToComment(comment, comment.commenter)
      ),
      message.recipients.map((recipient: any) =>
        User.prismaMapToUser(recipient)
      )
    );
  });

  console.log(messages);
  console.log(typeof messages[0]);

  return (
    <div className="flex justify-center h-full w-full">
      <div className="w-full max-w-screen-lg py-5">
        <h1 className="text-2xl font-bold text-center mb-5">Review Messages</h1>
        <Card>
          <Table className="text-center">
            <TableHeader className="text-center">
              <TableRow>
                <TableHead className="hidden md:table-cell text-center">
                  Id
                </TableHead>
                <TableHead className="hidden sm:table-cell text-center">
                  Type
                </TableHead>
                <TableHead className="text-center">Subject</TableHead>
                <TableHead className="hidden sm:table-cell text-center">
                  Created
                </TableHead>
                <TableHead className="hidden md:table-cell text-center">
                  Updated
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message: Message) => (
                <TableRow key={message.getId()}>
                  <TableCell className="hidden md:table-cell">
                    {message.getId()}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {(message as Suggestion) ? "Suggestion" : "Complaint"}
                  </TableCell>
                  <TableCell>
                    <Link
                      className="hover:text-neutral-500 underline transition-colors"
                      href={`/reviewer/${message.getId()}`}
                    >
                      {message.getSubject()}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {message.getDateCreated().toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {message.getDateUpdated().toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default ReviewerPage;
