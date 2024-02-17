import React from "react";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import PagedList from "@/lib/paged-list";
import { Datatable } from ".";

interface Props {
  datatable: Datatable;
  isPlaceholderData: boolean;
  data: PagedList<any> | undefined;
}

const DatatablePagination = ({
  datatable: { page, nextPage, previousPage, lastPage, firstPage, pageSize },
  isPlaceholderData,
  data = {
    hasNextPage: false,
    hasPreviousPage: false,
    totalCount: 1,
    items: [],
    page: 1,
    pageSize: 1,
  },
}: Props) => {
  const { hasNextPage, hasPreviousPage, totalCount } = data;

  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex items-center space-x-2 flex-wrap-reverse">
      <p className="text-xs">
        Page {page} of {pageCount}
      </p>
      <div className="space-x-1">
        <Button
          size={"sm"}
          className="w-8"
          onClick={() => {
            if (!isPlaceholderData && hasPreviousPage) {
              firstPage();
            }
          }}
          disabled={!hasPreviousPage}
        >
          <ChevronsLeft className="min-h-4 min-w-4 w-4 h-4" />
        </Button>
        <Button
          size={"sm"}
          className="w-8"
          onClick={() => {
            if (!isPlaceholderData && hasPreviousPage) {
              previousPage();
            }
          }}
          disabled={!hasPreviousPage}
        >
          <ChevronLeft className="min-h-4 min-w-4 w-4 h-4" />
        </Button>
        <Button
          size={"sm"}
          className="w-8"
          onClick={() => {
            if (!isPlaceholderData && hasNextPage) {
              nextPage();
            }
          }}
          disabled={!hasNextPage}
        >
          <ChevronRight className="min-h-4 min-w-4 w-4 h-4" />
        </Button>
        <Button
          size={"sm"}
          className="w-8"
          onClick={() => {
            if (!isPlaceholderData && hasNextPage) {
              lastPage();
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
