import React from "react";
import AddCommentForm from "./add-comment-form";
import CommentLine from "./comment-line";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageComment } from "@/classes/message-comment";

interface Props {
  messageId: string;
  comments: MessageComment[];
  userId: string;
}

const CommentsPanel = ({ messageId, comments, userId }: Props) => {
  return (
    <div className="flex flex-col space-y-5 sm:col-span-3">
      <AddCommentForm messageId={messageId} userId={userId} />
      <Separator />
      <ScrollArea className="max-h-64">
        <div className="flex flex-col space-y-3">
          {comments.map((comment: MessageComment) => (
            <CommentLine
              userId={userId}
              comment={comment}
              key={comment.getId()}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CommentsPanel;
