import React from "react";

interface Props {
  subject: string;
}

const MessageSubject = ({ subject }: Props) => {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-lg font-bold">Subject</h2>
      <p>{subject}</p>
    </div>
  );
};

export default MessageSubject;
