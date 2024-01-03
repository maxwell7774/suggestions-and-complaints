import React from "react";
import AddCommentForm from "./add-comment-form";
import CommentLine from "./comment-line";
import { MessageComment } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  messageId: string;
  comments: any[];
  userId: string;
}

const CommentsPanel = ({ messageId, comments, userId }: Props) => {
  return (
    <div className="flex flex-col space-y-5 sm:col-span-3">
      <Separator />
      <AddCommentForm messageId={messageId} userId={userId} />
      <Separator />
      <ScrollArea className="max-h-48">
        <div className="flex flex-col space-y-3">
          {comments.map((comment) => (
            <CommentLine
              userId={userId}
              comment={comment}
              commenter={comment.commenter}
              key={comment.id}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CommentsPanel;
