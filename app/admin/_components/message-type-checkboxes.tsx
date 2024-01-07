"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@prisma/client";
import React from "react";

interface Props {
  user: User;
  onUserChanges: (updatedUser: User) => void;
}

//These are the checkboxes that show up in the admin table
//Allows an admin to choose what message types users can recieve
const MessageTypeCheckboxes = ({ user, onUserChanges }: Props) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={user.suggestionRecipient}
            onCheckedChange={(value) => {
              onUserChanges({ ...user, suggestionRecipient: value as boolean });
            }}
          />
          <label className="hidden sm:inline">Suggestions</label>
          <label className="sm:hidden">Sugg</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={user.complaintRecipient}
            onCheckedChange={(value) => {
              onUserChanges({ ...user, complaintRecipient: value as boolean });
            }}
          />
          <label className="hidden sm:inline">Complaints</label>
          <label className="sm:hidden">Comp</label>
        </div>
      </div>
    </div>
  );
};

export default MessageTypeCheckboxes;
