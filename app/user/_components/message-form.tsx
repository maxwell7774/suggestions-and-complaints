import { Separator } from "@/components/ui/separator";
import React from "react";
import RecipientsDropdown from "./recipient-dropdown";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FieldValues, useForm } from "react-hook-form";
import { User } from "@prisma/client";

interface MessageFormProps {
  messageType: "SUGGESTION" | "COMPLAINT";
  suggestionRecipients: User[];
  complaintRecipients: User[];
  sender: User;
}

const MessageForm = ({ messageType, sender }: MessageFormProps) => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (fieldValues: FieldValues) => {
    const newMessage = {
      subject: fieldValues.subject,
      messageBody: fieldValues.messageBody,
      messageType: messageType,
      senderId: messageType === "COMPLAINT" ? null : sender.id,
      recipients: fieldValues.recipients.map((recipient: any) =>
        recipient.value.replace(recipient.label, "")
      ),
    };
    console.log(newMessage);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-5 py-5"
    >
      <div className="flex flex-col space-y-1">
        <p>Recipients</p>
        <RecipientsDropdown control={control} />
      </div>
      <div className="flex flex-col space-y-1">
        <p>Subject</p>
        <Input
          id="subject"
          placeholder="Please write your subject here..."
          {...register("subject")}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <p>Message</p>
        <Textarea
          id="body"
          placeholder="Please write your message here..."
          className="h-56"
          {...register("messageBody")}
        />
      </div>
      <Separator />
      <Button type="submit" variant={"secondary"}>
        Submit
      </Button>
    </form>
  );
};

export default MessageForm;
