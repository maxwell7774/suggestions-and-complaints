import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import RecipientsDropdown from "./recipient-dropdown";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FieldValues, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Value } from "@radix-ui/react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "../_schemas/message-form-schema";

type FormData = z.infer<typeof schema>;

interface MessageFormProps {
  messageType: "SUGGESTION" | "COMPLAINT";
  recipients: User[];
  sender: User;
}

const MessageForm = ({ messageType, sender, recipients }: MessageFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const {
    control,

    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  console.log(errors);

  const onSubmit = (fieldValues: FieldValues) => {
    router.prefetch("/user/message-submitted");
    setIsSubmitting(true);
    console.log(fieldValues);
    const newMessage = {
      subject: fieldValues.subject,
      messageBody: fieldValues.messageBody,
      messageType: messageType,
      senderId: messageType === "COMPLAINT" ? null : sender.id,
      recipients: fieldValues.recipients.map((recipient: any) =>
        recipient.value.replace(recipient.label, "")
      ),
    };
    axios
      .post("/api/messages", newMessage)
      .then(() => {
        reset();
        router.push("/user/message-submitted");
      })
      .catch((e) => {
        setIsSubmitting(false);
        console.log(e);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-5 py-5"
    >
      <div className="flex flex-col space-y-1">
        <label>Recipients</label>
        <RecipientsDropdown control={control} recipients={recipients} />
        {errors.recipients && (
          <p className="text-destructive">{errors.recipients.message}</p>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label>Subject</label>
        <Input
          id="subject"
          placeholder="Please write your subject here..."
          {...register("subject")}
        />
        {errors.subject && (
          <p className="text-destructive">{errors.subject.message}</p>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <label>Message</label>
        <Textarea
          id="body"
          placeholder="Please write your message here..."
          className="h-56"
          {...register("messageBody")}
        />
        {errors.messageBody && (
          <p className="text-destructive">{errors.messageBody.message}</p>
        )}
      </div>
      <Separator />
      <Button type="submit" disabled={isSubmitting} variant={"secondary"}>
        {isSubmitting && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
        Submit
      </Button>
    </form>
  );
};

export default MessageForm;
