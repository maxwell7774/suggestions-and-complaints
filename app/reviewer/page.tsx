import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prismaClient } from "@/prisma-client";
import React from "react";

const ReviewerPage = async () => {
  const messages = await prismaClient.message.findMany();

  console.log(messages);

  return (
    <div className="flex justify-center h-full w-full">
      <div className="w-full max-w-screen-lg py-5">
        <h1 className="text-2xl font-bold text-center mb-5">Review Messages</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Suggestion</TableCell>
              <TableCell>This is a suggestion</TableCell>
              <TableCell>Jan 1, 2023</TableCell>
              <TableCell>Jan 2, 2023</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Suggestion</TableCell>
              <TableCell>This is a suggestion</TableCell>
              <TableCell>Jan 1, 2023</TableCell>
              <TableCell>Jan 2, 2023</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Suggestion</TableCell>
              <TableCell>This is a suggestion</TableCell>
              <TableCell>Jan 1, 2023</TableCell>
              <TableCell>Jan 2, 2023</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Suggestion</TableCell>
              <TableCell>This is a suggestion</TableCell>
              <TableCell>Jan 1, 2023</TableCell>
              <TableCell>Jan 2, 2023</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReviewerPage;
