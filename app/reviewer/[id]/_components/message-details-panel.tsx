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
    <Card className="h-full min-w-min">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <label>Id:</label>
          <label className="sm:hidden  md:block">{message.id}</label>
          <label className="hidden sm:block md:hidden">
            ...
            {message.id.substring(message.id.length - 10, message.id.length)}
          </label>
        </div>
        <Separator />
        <div className="flex items-center space-x-2">
          <label>Type:</label>
          <label>
            {message.messageType === "SUGGESTION" ? "Suggestion" : "Complaint"}
          </label>
        </div>
        <Separator />
        <div className="flex items-center">
          <label>Sender:</label>
          <label>{sender ? sender.name : "Anonymous"}</label>
        </div>
        <Separator />
        <div className="flex space-x-1 flex-wrap">
          <label>Recipients:</label>
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
