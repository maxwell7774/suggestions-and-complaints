import React from "react";

interface Props {
  subject: string;
}

const MessageSubject = ({ subject }: Props) => {
  return (
    <div className="flex flex-col space-y-2">
      <label>Subject</label>
      <span>{subject}</span>
    </div>
  );
};

export default MessageSubject;
