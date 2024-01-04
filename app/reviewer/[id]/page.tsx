import { auth } from "@/auth";
import isAuthorized from "@/lib/is-authorized";
import { prismaClient } from "@/prisma-client";
import { Message, User } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import CommentsPanel from "./_components/comments-panel";
import MessageBody from "./_components/message-body";
import MessageDetailsPanel from "./_components/message-details-panel";
import MessageSubject from "./_components/message-subject";

interface MessageDetailsProps {
  params: { id: string };
}

const MessageDetailsPage = async ({ params: { id } }: MessageDetailsProps) => {
  const session = await auth();
  const authorizedRoles = ["REVIEWER", "ADMIN"];

  if (!isAuthorized(session, authorizedRoles)) {
    redirect("/not-authorized");
  }

  const message = await prismaClient.message.findUnique({
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

  if (!message) {
    return (
      <div className="flex justify-center w-full h-full items-center">
        No Message Found...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <h1 className="text-center my-5 text-2xl font-bold">Message Details</h1>
      <div className="max-w-screen-lg w-full grid grid-cols-1 sm:grid-cols-3 auto-rows-min gap-5 mb-5">
        <div className="flex flex-col space-y-5 sm:col-span-2">
          <MessageSubject subject={message.subject} />
          <MessageBody messageBody={message.messageBody} />
        </div>
        <div className="hidden sm:block">
          <MessageDetailsPanel
            message={message}
            recipients={message.recipients.map(
              (messageRecipient: any) => messageRecipient.recipient
            )}
            sender={message.sender}
          />
        </div>

        <div className="sm:hidden">
          <MessageDetailsPanel
            message={message}
            recipients={message.recipients.map(
              (messageRecipient: any) => messageRecipient.recipient
            )}
            sender={message.sender}
          />
        </div>
        <CommentsPanel
          messageId={id}
          comments={message.comments}
          userId={session?.user.id!}
        />
      </div>
    </div>
  );
};

export default MessageDetailsPage;
