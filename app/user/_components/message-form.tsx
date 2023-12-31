import { Separator } from "@/components/ui/separator";
import React from "react";
import RecipientsDropdown from "./recipient-dropdown";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User } from "next-auth";

interface MessageFormProps {
  messageType: "SUGGESTION" | "COMPLAINT";
  sender: User;
}

const MessageForm = ({ messageType, sender }: MessageFormProps) => {
  return (
    <form className="flex flex-col space-y-5 py-5">
      <div className="flex flex-col space-y-1">
        <p>Recipients</p>
        <RecipientsDropdown />
      </div>
      <div className="flex flex-col space-y-1">
        <p>Subject</p>
        <Input id="subject" placeholder="Please write your subject here..." />
      </div>
      <div className="flex flex-col space-y-1">
        <p>Message</p>
        <Textarea
          id="body"
          placeholder="Please write your message here..."
          className="h-screen"
        />
      </div>
      <Separator />
      <Button variant={"secondary"}>Submit</Button>
    </form>
  );
};

export default MessageForm;
