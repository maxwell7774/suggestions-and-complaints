import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prismaClient } from "@/prisma-client";
import Link from "next/link";
import React from "react";

const ReviewerPage = async () => {
  const messages = await prismaClient.message.findMany();

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
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.id}</TableCell>
                <TableCell>
                  {message.messageType === "SUGGESTION"
                    ? "Suggestion"
                    : "Complaint"}
                </TableCell>
                <TableCell>
                  <Link
                    className="hover:text-neutral-500 underline transition-colors"
                    href={`/reviewer/${message.id}`}
                  >
                    {message.subject}
                  </Link>
                </TableCell>
                <TableCell>{message.dateCreated.toLocaleString()}</TableCell>
                <TableCell>{message.dateUpdated.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReviewerPage;
