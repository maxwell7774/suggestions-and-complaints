"use client";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MessageTypeCheckboxes from "./message-type-checkboxes";
import RoleRadios from "./role-radios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Props {
  users: User[];
}

const AdminTable = ({ users }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="p-1">Name</TableHead>
          <TableHead className="p-1">Role</TableHead>
          <TableHead className="p-1">Message Types</TableHead>
          <TableHead className="p-1">Save Changes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <AdminTableRow key={user.id} user={user} />
        ))}
      </TableBody>
    </Table>
  );
};

interface AdminTableRowProps {
  user: User;
}

const AdminTableRow = ({ user }: AdminTableRowProps) => {
  const [originalUser, setOriginalUser] = useState<User>(user);
  const [updatedUser, setUserChanges] = useState<User>(user);
  const router = useRouter();

  const handleSaveChanges = () => {
    const originalUserBeforeSave = originalUser;
    setOriginalUser(updatedUser);
    axios
      .put(`/api/users/${updatedUser.id}`, updatedUser)
      .then(() => router.refresh())
      .catch((e) => {
        console.log("Couldn't update user.");
        setOriginalUser(originalUserBeforeSave);
      });
  };

  return (
    <TableRow>
      <TableCell className="p-1">
        {originalUser.name ? originalUser.name : "(Unknown Name)"}
      </TableCell>
      <TableCell className="p-1">
        <RoleRadios user={updatedUser} onUserChanges={setUserChanges} />
      </TableCell>
      <TableCell className="p-1">
        <MessageTypeCheckboxes
          user={updatedUser}
          onUserChanges={setUserChanges}
        />
      </TableCell>
      <TableCell className="p-1">
        <Button
          onClick={handleSaveChanges}
          disabled={
            JSON.stringify(updatedUser) === JSON.stringify(originalUser)
          }
        >
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AdminTable;
