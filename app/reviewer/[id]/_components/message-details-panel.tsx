import { Message } from "@/classes/message/message";
import { Suggestion } from "@/classes/message/suggestion";
import { User } from "@/classes/user";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
          <span className="sm:hidden  md:block">{message.getId()}</span>
          <span className="hidden sm:block md:hidden">
            ...
            {message
              .getId()
              .substring(message.getId().length - 10, message.getId().length)}
          </span>
        </div>
        <Separator />
        <div className="flex items-center space-x-2 p-3">
          <span className="font-semibold">Type:</span>
          <span>{(message as Suggestion) ? "Suggestion" : "Complaint"}</span>
        </div>
        <Separator />
        <div className="flex items-center space-x-2 p-3 ">
          <span className="font-semibold">Sender:</span>
          <span>{sender ? sender.getName() : "Anonymous"}</span>
        </div>
        <Separator />
        <div className="flex space-x-2 flex-wrap p-3">
          <span className="font-semibold">Recipients:</span>
          {recipients &&
            recipients.map((recipient) => (
              <div key={recipient.getId()}>
                <span>{recipient.getName()}</span>
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
