"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User } from "@prisma/client";
import React, { useState } from "react";

interface Props {
  user: User;
  onUserChanges: (updatedUser: User) => void;
}

const RoleRadios = ({ user, onUserChanges }: Props) => {
  return (
    <RadioGroup
      value={user.role}
      onValueChange={(value) => {
        onUserChanges({
          ...user,
          role: value as "USER" | "REVIEWER" | "ADMIN",
        });
      }}
    >
      <div className="flex flex-col items-center">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="USER" />
            <label>User</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="REVIEWER" />
            <label>Reviewer</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ADMIN" />
            <label>Admin</label>
          </div>
        </div>
      </div>
    </RadioGroup>
  );
};

export default RoleRadios;
