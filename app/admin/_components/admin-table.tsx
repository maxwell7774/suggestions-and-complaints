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
import { Card } from "@/components/ui/card";

interface Props {
  users: User[];
}

const AdminTable = ({ users }: Props) => {
  return (
    <Card>
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="p-2 text-center">Name</TableHead>
            <TableHead className="p-2 text-center">Role</TableHead>
            <TableHead className="p-2 text-center">Message Types</TableHead>
            <TableHead className="p-2 text-center">Save Changes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <AdminTableRow key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </Card>
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
      <TableCell className="p-2">
        {originalUser.name ? originalUser.name : "(Unknown Name)"}
      </TableCell>
      <TableCell className="p-2">
        <RoleRadios user={updatedUser} onUserChanges={setUserChanges} />
      </TableCell>
      <TableCell className="p-2">
        <MessageTypeCheckboxes
          user={updatedUser}
          onUserChanges={setUserChanges}
        />
      </TableCell>
      <TableCell className="p-2">
        <Button
          size={"sm"}
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
