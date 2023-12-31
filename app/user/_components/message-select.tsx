"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import MessageForm from "./message-form";
import { Separator } from "@/components/ui/separator";
import { User } from "next-auth";

interface MessageSelectProps {
  sender: User;
}

const MessageSelect = ({ sender }: MessageSelectProps) => {
  const [messageType, setMessageType] = useState<"SUGGESTION" | "COMPLAINT">(
    "SUGGESTION"
  );

  return (
    <div className="flex flex-col space-y-5">
      <h1 className="text-3xl font-bold text-center">
        Write your {messageType === "SUGGESTION" ? "suggestion" : "complaint"}{" "}
        here
      </h1>
      <h2 className="text-lg font-semibold text-center sm:text-left">
        Sender: {messageType === "SUGGESTION" ? sender.name : "Anonymous"}
      </h2>
      <Separator />
      <Tabs defaultValue="suggestion">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger
            value="suggestion"
            onClick={() => setMessageType("SUGGESTION")}
          >
            Suggestion
          </TabsTrigger>
          <TabsTrigger
            value="complaint"
            onClick={() => setMessageType("COMPLAINT")}
          >
            Complaint
          </TabsTrigger>
        </TabsList>
        <TabsContent value="suggestion">
          <MessageForm messageType={messageType} sender={sender} />
        </TabsContent>
        <TabsContent value="complaint">
          <MessageForm messageType={messageType} sender={sender} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessageSelect;
