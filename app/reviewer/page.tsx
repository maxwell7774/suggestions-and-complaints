import { Card } from "@/components/ui/card";
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
        <Card>
          <Table className="text-center">
            <TableHeader className="text-center">
              <TableRow>
                <TableHead className="hidden md:table-cell text-center">
                  Id
                </TableHead>
                <TableHead className="hidden sm:table-cell text-center">
                  Type
                </TableHead>
                <TableHead className="text-center">Subject</TableHead>
                <TableHead className="hidden sm:table-cell text-center">
                  Created
                </TableHead>
                <TableHead className="hidden md:table-cell text-center">
                  Updated
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="hidden md:table-cell">
                    {message.id}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
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
                  <TableCell className="hidden sm:table-cell">
                    {message.dateCreated.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {message.dateUpdated.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default ReviewerPage;
