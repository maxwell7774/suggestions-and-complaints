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
import MessagesDatatable from "./_components/messages-datatable";

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

  return (
    <div className="flex justify-center h-full w-full">
      <div className="w-full max-w-screen-xl py-5">
        <h1 className="text-2xl font-bold text-center mb-5">Review Messages</h1>
        <MessagesDatatable />
      </div>
    </div>
  );
};

export default ReviewerPage;
