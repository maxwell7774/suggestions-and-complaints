"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface Props {
  messageId: string;
  userId: string;
}
const AddCommentForm = ({ messageId, userId }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (fieldValues: FieldValues) => {
    setIsLoading(true);
    axios
      .post("/api/messages/comments", {
        ...fieldValues,
        messageId: messageId,
        commenterId: userId,
      })
      .then((res) => {
        router.refresh();
        reset();
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-3">
        <h2 className="text-xl">Comments</h2>
        <Textarea
          className="h-48"
          placeholder="Reviewer Comments:"
          {...register("comment")}
        />
        <div className="flex items-center flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Add Comment
          </Button>
          <Button type="reset" onClick={() => reset()}>
            Clear
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddCommentForm;
