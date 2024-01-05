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
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import schema from "../_schemas/comment-form-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageComment } from "@/classes/message-comment";
import { User } from "@/classes/user";

type FormData = z.infer<typeof schema>;

interface Props {
  commentId: string;
}

const EditCommentButton = ({ commentId }: Props) => {
  const [comment, setComment] = useState<MessageComment>();
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

  useEffect(() => {
    axios
      .get(`/api/messages/comments/${commentId}`)
      .then((res) =>
        setComment(
          MessageComment.prismaMapToComment(
            res.data,
            User.prismaMapToUser(res.data.commenter)
          )
        )
      );
  }, []);

  if (!comment) {
    return null;
  }

  const onSubmit = (fieldValues: FieldValues) => {
    if (comment.getCommentMessage() !== fieldValues.comment) {
      setIsPending(true);
      const updatedComment = {
        id: comment.getId(),
        comment: fieldValues.comment,
        dateCreated: comment.getDateCreated(),
        lastUpdated: comment.getDateUpdated(),
        commenterId: comment.getCommenter().getId(),
      };
      console.log(updatedComment);

      axios
        .put(`/api/messages/comments/${comment.getId()}`, updatedComment)
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
              defaultValue={comment.getCommentMessage()}
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
