import React from "react";
import DeleteCommentButton from "./delete-comment-button";
import EditCommentButton from "./edit-comment-button";
import { MessageComment } from "@/classes/message-comment";

interface Props {
  comment: MessageComment;
  userId: string;
}

//Comment line component that displays the comment in a blockquote
//and gives access to the edit and delete buttons for that comment
const CommentLine = ({ comment, userId }: Props) => {
  return (
    <div
      className="flex justify-between items-center space-x-3"
      key={comment.getId()}
    >
      <blockquote className=" border-l-2 pl-6 italic">
        <span>
          {comment.getCommenter().getName() +
            " (" +
            comment.getDateUpdated().toLocaleString() +
            ")"}
        </span>
        <span>{": " + comment.getCommentMessage()}</span>
      </blockquote>
      {userId === comment.getCommenter().getId() && (
        <div className="flex space-x-2">
          <EditCommentButton commentId={comment.getId()} />
          <DeleteCommentButton
            commentId={comment.getId()}
            commentMessage={comment.getCommentMessage()}
          />
        </div>
      )}
    </div>
  );
};

export default CommentLine;
