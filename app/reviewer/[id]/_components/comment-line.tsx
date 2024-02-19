import React from "react";
import DeleteCommentButton from "./delete-comment-button";
import EditCommentButton from "./edit-comment-button";
import { MessageComment, User } from "@prisma/client";

interface Props {
  comment: MessageComment & { commenter: User };
  userId: string;
}

//Comment line component that displays the comment in a blockquote
//and gives access to the edit and delete buttons for that comment
const CommentLine = ({ comment, userId }: Props) => {
  return (
    <div
      className="flex justify-between items-center space-x-3"
      key={comment.id}
    >
      <blockquote className=" border-l-2 pl-6 italic">
        <span>
          {comment.commenter.name +
            " (" +
            comment.lastUpdated.toLocaleString() +
            ")"}
        </span>
        <span>{": " + comment.comment}</span>
      </blockquote>
      {userId === comment.commenter.id && (
        <div className="flex space-x-2">
          <EditCommentButton commentId={comment.id} />
          <DeleteCommentButton
            commentId={comment.id}
            commentMessage={comment.comment}
          />
        </div>
      )}
    </div>
  );
};

export default CommentLine;
