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
  recipients: User[];
  sender: User;
}

const MessageForm = ({ messageType, sender, recipients }: MessageFormProps) => {
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
        <label>Recipients</label>
        <RecipientsDropdown control={control} recipients={recipients} />
      </div>
      <div className="flex flex-col space-y-1">
        <label>Subject</label>
        <Input
          id="subject"
          placeholder="Please write your subject here..."
          {...register("subject")}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label>Message</label>
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
