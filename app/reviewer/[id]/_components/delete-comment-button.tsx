"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageComment } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  comment: MessageComment;
}

const DeleteCommentButton = ({
  comment: { id, comment, dateCreated },
}: Props) => {
  const [pendingDelete, setPendingDelete] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = () => {
    setPendingDelete(true);
    axios
      .delete(`/api/messages/comments/${id}`)
      .then(() => router.refresh())
      .catch((e) => console.log(e))
      .finally(() => setPendingDelete(false));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} disabled={pendingDelete}>
          {pendingDelete && <Loader2 className="w-4 h-4 animate-spin" />}
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this comment?
        </DialogDescription>
        <blockquote className="mt-6 border-l-2 pl-6 italic">
          <ScrollArea className="max-h-96">{comment}</ScrollArea>
        </blockquote>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleDelete}>Yes</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button color="gray">No</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCommentButton;
