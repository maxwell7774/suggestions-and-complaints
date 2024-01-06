// import { ToastDestructive, ToastSuccess } from "@/components/toast-variants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
// import { toast } from "sonner";
import DatatableParams from "../datatable-params";
import axios from "axios";

//Update row hook
//Uses optimistic updating
//Uses the id and new rowdata to update the data
export function useUpdateRow(datatableParams: DatatableParams) {
  const queryClient = useQueryClient();
  const { status, data: session } = useSession();

  return useMutation({
    mutationKey: [datatableParams.apiUrl],
    mutationFn: async (updatedRow: any) => {
      console.log(updatedRow);
      return await axios.put(
        `${datatableParams.apiUrl}/${
          updatedRow[datatableParams.primaryKeyProperty]
        }`,
        updatedRow
      );
    },
    onSuccess: () => {
      // toast.custom((toastId) => (
      //   <ToastSuccess description="Update successful" toastId={toastId} />
      // ));
    },
    onError: (err, editedRow, context) => {
      // toast.custom((toastId) => (
      //   <ToastDestructive description="Update unsuccessful" toastId={toastId} />
      // ));
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [datatableParams.apiUrl],
      });
    },
  });
}
