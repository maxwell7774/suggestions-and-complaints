// import {
//   ToastDestructive,
//   ToastInfo,
//   ToastSuccess,
// } from "@/components/toast-variants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

//Update row hook
//Uses optimistic updating
//Uses the id and new rowdata to update the data
export function useUpdateRow(apiUrl: string, primaryKeyField: string) {
  const queryClient = useQueryClient();
  const { status, data: session } = useSession();

  return useMutation({
    mutationKey: [apiUrl],
    mutationFn: async (updatedRow: any) => {
      console.log(updatedRow);
      return await axios.put(
        `${apiUrl}/${updatedRow[primaryKeyField]}`,
        updatedRow
      );
    },
    onMutate: () => {
      // toast.custom((toastId) => (
      //   <ToastInfo toastId={toastId}>
      //     <div className="flex space-x-2 items-center">
      //       <p className="animate-pulse">Saving</p>
      //     </div>
      //   </ToastInfo>
      // ));
    },
    onSuccess: () => {
      // toast.custom((toastId) => (
      //   <ToastSuccess toastId={toastId}>Update successfull</ToastSuccess>
      // ));
    },
    onError: (err, editedRow, context) => {
      // toast.custom((toastId) => (
      //   <ToastDestructive toastId={toastId}>
      //     Update unsuccessful
      //   </ToastDestructive>
      // ));
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [apiUrl],
      });
    },
  });
}
