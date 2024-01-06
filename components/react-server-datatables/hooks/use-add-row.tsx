import { ToastDestructive, ToastSuccess } from "@/components/toast-variants";
import axiosClient from "@/lib/axios-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

//Add row hook
export function useAddRow(apiUrl: string, primaryKey: string) {
  const queryClient = useQueryClient();
  const { status, data: session } = useSession();

  //Mutation hook to modify the react query context and add the new row
  //Uses optimistic updates to immediately update the ui, but it reverts if the POST fails
  return useMutation({
    mutationKey: [apiUrl],
    mutationFn: (newRow) => {
      console.log(newRow);
      console.log(apiUrl);
      return axiosClient.post(apiUrl, newRow, session);
    },
    onMutate: async (newRow: any) => {
      await queryClient.cancelQueries({ queryKey: [apiUrl] });

      const previousData: any = queryClient.getQueryData([apiUrl]);

      if (previousData) {
        const updatedData = [
          ...previousData,
          { ...newRow, [primaryKey]: "Pending" },
        ];
        queryClient.setQueryData([apiUrl], updatedData);
      }
      return { previousData };
    },
    onSuccess: () => {
      toast.custom((toastId) => (
        <ToastSuccess description="Added record" toastId={toastId} />
      ));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [apiUrl] });
    },
    onError: (err, editedRow, context) => {
      if (context) {
        queryClient.setQueryData([apiUrl], context.previousData);
        toast.custom((toastId) => (
          <ToastDestructive
            description="Failed to add record"
            toastId={toastId}
          />
        ));
      }
    },
  });
}
