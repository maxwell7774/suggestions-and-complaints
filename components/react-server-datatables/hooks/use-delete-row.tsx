import { ToastDestructive, ToastSuccess } from "@/components/toast-variants";
import axiosClient from "@/lib/axios-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

//Delete row hook
//Uses optimistic updating
//Deletes by id
export function useDeleteRow(
  apiUrl: string,
  primaryKey: string,
  selectedRow: any,
  setSelectedRow: (newSelectedRow: any) => void
) {
  const queryClient = useQueryClient();
  const { status, data: session } = useSession();

  return useMutation({
    mutationKey: [apiUrl],
    mutationFn: () => {
      return axiosClient.delete(
        apiUrl + "/" + selectedRow[primaryKey],
        session
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [apiUrl] });

      const previousData: any = queryClient.getQueryData([apiUrl]);

      if (previousData) {
        const updatedData = previousData.filter(
          (row: any) => row[primaryKey] !== selectedRow[primaryKey]
        );
        queryClient.setQueryData([apiUrl], updatedData);
      }
      return { previousData };
    },
    onSuccess: () => {
      toast.custom((toastId) => (
        <ToastSuccess description="Deleted record" toastId={toastId} />
      ));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [apiUrl] });
      setSelectedRow(undefined);
    },
    onError: (err, editedRow, context) => {
      if (context) {
        queryClient.setQueryData([apiUrl], context.previousData);
        toast.custom((toastId) => (
          <ToastDestructive
            description="Failed to delete record"
            toastId={toastId}
          />
        ));
      }
    },
  });
}
