"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MessageComment } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import schema from "../_schemas/comment-form-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof schema>;

interface Props {
  comment: MessageComment;
}

const EditCommentButton = ({ comment }: Props) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const onSubmit = (fieldValues: FieldValues) => {
    if (comment.comment !== fieldValues.comment) {
      setIsPending(true);
      const updatedComment = { ...comment, comment: fieldValues.comment };
      console.log(updatedComment);

      axios
        .put(`/api/messages/comments/${comment.id}`, updatedComment)
        .then(() => router.refresh())
        .catch((e) => console.log(e))
        .finally(() => setIsPending(false));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} disabled={isPending}>
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editing Comment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogDescription>
            <Textarea
              placeholder="Please enter your comment..."
              defaultValue={comment.comment}
              rows={10}
              {...register("comment")}
            />
            {errors.comment && (
              <p className="text-destructive mt-2">{errors.comment.message}</p>
            )}
          </DialogDescription>
          <DialogFooter>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
              <Button type="submit">
                {" "}
                {isPending && (
                  <Loader2 className="w-4 h-4 min-w-4 min-h-4 mr-1 animate-spin" />
                )}
                Save
              </Button>
              <DialogClose asChild>
                <Button type="button">Cancel</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCommentButton;
