import { MessageComment } from "@/classes/message-comment";
import { Complaint } from "@/classes/message/complaint";
import { Message } from "@/classes/message/message";
import { Suggestion } from "@/classes/message/suggestion";
import { User } from "@/classes/user";
import { prismaClient } from "@/prisma-client";
import MessagesDatatable from "./_components/messages-datatable";
import { auth } from "@/auth";
import isAuthorized from "@/lib/is-authorized";
import { redirect } from "next/navigation";

const ReviewerPage = async () => {
  const session = await auth();
  const authorizedRoles = ["REVIEWER", "ADMIN"];

  //Checks for page authorization
  if (!isAuthorized(session, authorizedRoles)) {
    redirect("/not-authorized");
  }

  //Gests all the messages and converts them from a prisma message type
  //to an array of my custom message types. These could be either suggestions
  //or commplaints that get stored in the Message[]
  const messages: Message[] = (
    await prismaClient.message.findMany({
      include: {
        comments: { include: { commenter: true } },
        recipients: true,
        sender: true,
      },
    })
  ).map((message: any) => {
    //Converts complaints to Complaint class
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
    //Converts suggestions to Suggestion class
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
