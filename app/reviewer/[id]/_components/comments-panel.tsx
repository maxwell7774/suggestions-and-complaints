import React from "react";
import AddCommentForm from "./add-comment-form";
import CommentLine from "./comment-line";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageComment, User } from "@prisma/client";

interface Props {
  messageId: string;
  comments: (MessageComment & { commenter: User })[] | undefined;
  userId: string;
}

//This is the comments panel that holds the comment form and all the comment lines
const CommentsPanel = ({ messageId, comments, userId }: Props) => {
  if (!comments) {
    return null;
  }
  return (
    <div className="flex flex-col space-y-5 sm:col-span-3">
      <AddCommentForm messageId={messageId} userId={userId} />
      <Separator />
      <ScrollArea className="max-h-64">
        <div className="flex flex-col space-y-3">
          {comments.map((comment) => (
            <CommentLine userId={userId} comment={comment} key={comment.id} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CommentsPanel;
