import React from "react";
import DeleteCommentButton from "./delete-comment-button";
import EditCommentButton from "./edit-comment-button";
import { MessageComment, User } from "@prisma/client";
import { Session } from "next-auth";

interface Props {
  comment: MessageComment;
  commenter: any;
  userId: string;
}

const CommentLine = ({ comment, commenter, userId }: Props) => {
  return (
    <div
      className="flex justify-between items-center space-x-3"
      key={comment.id}
    >
      <blockquote className=" border-l-2 pl-6 italic">
        <span>
          {commenter.name + " (" + comment.lastUpdated.toLocaleString() + ")"}
        </span>
        <span>{": " + comment.comment}</span>
      </blockquote>
      {userId === comment.commenterId && (
        <div className="flex space-x-2">
          <EditCommentButton comment={comment} />
          <DeleteCommentButton comment={comment} />
        </div>
      )}
    </div>
  );
};

export default CommentLine;
