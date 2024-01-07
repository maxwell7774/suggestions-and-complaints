import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

interface Props {
  messageBody: string;
}

//Displays the message body on the message details page
const MessageBody = ({ messageBody }: Props) => {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-lg font-bold">Message Body</h2>
      <ScrollArea className="max-h-96">
        <p>{messageBody}</p>
      </ScrollArea>
    </div>
  );
};

export default MessageBody;
