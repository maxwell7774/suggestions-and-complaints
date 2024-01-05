import { auth } from "@/auth";
import isAuthorized from "@/lib/is-authorized";
import { prismaClient } from "@/prisma-client";
import { Message as PrismaMessage, User as PrismaUser } from "@prisma/client";
import { Message } from "@/classes/message/message";
import { Complaint } from "@/classes/message/complaint";
import { Suggestion } from "@/classes/message/suggestion";
import { redirect } from "next/navigation";
import React from "react";
import CommentsPanel from "./_components/comments-panel";
import MessageBody from "./_components/message-body";
import MessageDetailsPanel from "./_components/message-details-panel";
import MessageSubject from "./_components/message-subject";
import { MessageComment } from "@/classes/message-comment";
import { User } from "@/classes/user";

interface MessageDetailsProps {
  params: { id: string };
}

const MessageDetailsPage = async ({ params: { id } }: MessageDetailsProps) => {
  const session = await auth();
  const authorizedRoles = ["REVIEWER", "ADMIN"];

  if (!isAuthorized(session, authorizedRoles)) {
    redirect("/not-authorized");
  }

  const prismaMessage = await prismaClient.message.findUnique({
    where: { id: id },
    include: {
      recipients: { include: { recipient: true } },
      sender: true,
      comments: {
        include: { commenter: true },
        orderBy: { lastUpdated: "desc" },
      },
    },
  });

  if (!prismaMessage) {
    return (
      <div className="flex justify-center w-full h-full items-center">
        No Message Found...
      </div>
    );
  }

  const message: Message =
    prismaMessage.messageType === "COMPLAINT"
      ? Complaint.prismaMapToComplaint(
          prismaMessage,
          prismaMessage.comments.map((comment: any) =>
            MessageComment.prismaMapToComment(
              comment,
              User.prismaMapToUser(comment.commenter)
            )
          ),
          prismaMessage.recipients.map((recipient: any) =>
            User.prismaMapToUser(recipient)
          )
        )
      : Suggestion.prismaMapToSuggestion(
          prismaMessage,
          User.prismaMapToUser(prismaMessage.sender!),
          prismaMessage.comments.map((comment: any) =>
            MessageComment.prismaMapToComment(
              comment,
              User.prismaMapToUser(comment.commenter)
            )
          ),
          prismaMessage.recipients.map((recipient: any) =>
            User.prismaMapToUser(recipient)
          )
        );

  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <h1 className="text-center my-5 text-2xl font-bold">Message Details</h1>
      <div className="max-w-screen-lg w-full grid grid-cols-1 sm:grid-cols-3 auto-rows-min gap-5 mb-5">
        <div className="flex flex-col space-y-5 sm:col-span-2">
          <MessageSubject subject={message.getSubject()} />
          <MessageBody messageBody={message.getMessageBody()} />
        </div>
        <div className="hidden sm:block">
          <MessageDetailsPanel
            message={message}
            recipients={message.getRecipients()}
            sender={
              (message as Suggestion)
                ? (message as Suggestion).getSender()
                : null
            }
          />
        </div>

        <div className="sm:hidden">
          <MessageDetailsPanel
            message={message}
            recipients={message.getRecipients()}
            sender={
              (message as Suggestion)
                ? (message as Suggestion).getSender()
                : null
            }
          />
        </div>
        <CommentsPanel
          messageId={id}
          comments={message.getComments()}
          userId={session?.user.id!}
        />
      </div>
    </div>
  );
};

export default MessageDetailsPage;
