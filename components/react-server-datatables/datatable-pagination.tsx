import React from "react";
import DatatableParams from "./datatable-params";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface Props {
  datatableParams: DatatableParams;
  setDatatableParams: (newDatatableParams: DatatableParams) => void;
  isPlaceholderData: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
}

const DatatablePagination = ({
  datatableParams,
  setDatatableParams,
  isPlaceholderData,
  hasNextPage,
  hasPreviousPage,
  totalCount,
}: Props) => {
  const pageCount = Math.ceil(totalCount / datatableParams.pageSize);

  return (
    <div className="flex items-center space-x-2 flex-wrap-reverse">
      <p className="text-xs">
        Page {datatableParams.page} of {pageCount}
      </p>
      <div className="space-x-1">
        <Button
          className="h-8 w-8"
          onClick={() => {
            if (!isPlaceholderData && hasPreviousPage) {
              setDatatableParams({
                ...datatableParams,
                page: 1,
              });
            }
          }}
          disabled={!hasPreviousPage}
        >
          <ChevronsLeft className="min-h-4 min-w-4 w-4 h-4" />
        </Button>
        <Button
          className="h-8 w-8"
          onClick={() => {
            if (!isPlaceholderData && hasPreviousPage) {
              setDatatableParams({
                ...datatableParams,
                page: datatableParams.page - 1,
              });
            }
          }}
          disabled={!hasPreviousPage}
        >
          <ChevronLeft className="min-h-4 min-w-4 w-4 h-4" />
        </Button>
        <Button
          className="h-8 w-8"
          onClick={() => {
            if (!isPlaceholderData && hasNextPage) {
              setDatatableParams({
                ...datatableParams,
                page: datatableParams.page + 1,
              });
            }
          }}
          disabled={!hasNextPage}
        >
          <ChevronRight className="min-h-4 min-w-4 w-4 h-4" />
        </Button>
        <Button
          className="h-8 w-8"
          onClick={() => {
            if (!isPlaceholderData && hasNextPage) {
              setDatatableParams({
                ...datatableParams,
                page: pageCount,
              });
            }
          }}
          disabled={!hasNextPage}
        >
          <ChevronsRight className="min-h-4 min-w-4 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default DatatablePagination;
