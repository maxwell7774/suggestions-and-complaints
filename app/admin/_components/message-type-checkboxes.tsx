"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@prisma/client";
import React from "react";

interface Props {
  user: User;
  onUserChanges: (updatedUser: User) => void;
}

const MessageTypeCheckboxes = ({ user, onUserChanges }: Props) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={user.suggestionRecipient}
          onCheckedChange={(value) => {
            onUserChanges({ ...user, suggestionRecipient: value as boolean });
          }}
        />
        <label className="hidden xs:inline">Suggestions</label>
        <label className="xs:hidden">Sugg</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={user.complaintRecipient}
          onCheckedChange={(value) => {
            onUserChanges({ ...user, complaintRecipient: value as boolean });
          }}
        />
        <label className="hidden xs:inline">Complaints</label>
        <label className="xs:hidden">Comp</label>
      </div>
    </div>
  );
};

export default MessageTypeCheckboxes;
