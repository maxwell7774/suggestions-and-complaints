"use client";

import { MessageComment } from "@/classes/message-comment";
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
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  commentId: string;
  commentMessage: string;
}

//Delete component that shows on the comment line
const DeleteCommentButton = ({ commentId, commentMessage }: Props) => {
  const [pendingDelete, setPendingDelete] = useState<boolean>(false);
  const router = useRouter(); //router for refreshing the page after the comment is deleted

  //Sends the delete request to the backend
  const handleDelete = () => {
    setPendingDelete(true);
    axios
      .delete(`/api/messages/comments/${commentId}`)
      .then(() => router.refresh())
      .catch((e) => console.log(e))
      .finally(() => setPendingDelete(false));
  };

  //Handles displaying the confirmation modal
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
          <ScrollArea className="max-h-96">{commentMessage}</ScrollArea>
        </blockquote>
        <DialogFooter>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
            <DialogClose asChild>
              <Button onClick={handleDelete}>Yes</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button color="gray">No</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCommentButton;
