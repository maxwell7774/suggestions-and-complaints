import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Message, MessageRecipient, User } from "@prisma/client";
import React from "react";

interface Props {
  message: Message;
  sender: User | null;
  recipients: User[] | null;
}

const MessageDetailsPanel = ({ message, sender, recipients }: Props) => {
  return (
    <Card className="h-full min-w-min min-h-96">
      <div className="flex flex-col">
        <div className="flex items-center space-x-2 p-3">
          <span className="font-semibold">Id:</span>
          <span className="sm:hidden  md:block">{message.id}</span>
          <span className="hidden sm:block md:hidden">
            ...
            {message.id.substring(message.id.length - 10, message.id.length)}
          </span>
        </div>
        <Separator />
        <div className="flex items-center space-x-2 p-3">
          <span className="font-semibold">Type:</span>
          <span>
            {message.messageType === "SUGGESTION" ? "Suggestion" : "Complaint"}
          </span>
        </div>
        <Separator />
        <div className="flex items-center space-x-2 p-3 ">
          <span className="font-semibold">Sender:</span>
          <span>{sender ? sender.name : "Anonymous"}</span>
        </div>
        <Separator />
        <div className="flex space-x-2 flex-wrap p-3">
          <span className="font-semibold">Recipients:</span>
          {recipients &&
            recipients.map((recipient) => (
              <div key={recipient.id}>
                <span>{recipient.name}</span>
                {recipient !== recipients[recipients.length - 1] && (
                  <span>{","}</span>
                )}
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
};

export default MessageDetailsPanel;
