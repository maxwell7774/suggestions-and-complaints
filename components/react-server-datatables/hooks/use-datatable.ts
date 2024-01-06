import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Session } from "next-auth/types";
import { useState } from "react";
import DatatableParams from "../datatable-params";
import PagedList from "@/lib/paged-list";
import { Message } from "@prisma/client";

interface DatatableProps<Type> {
  apiUrl: string;
  primaryKeyProperty: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  searchCol?: string;
  sortCol?: string;
  sortDir?: "asc" | "desc";
  initialEditMode?: boolean;
  initialData?: PagedList<Type>;
}

//Use query hook to get the data based on the api url
export function useDatatable<Type>({
  apiUrl,
  primaryKeyProperty,
  page = 1,
  pageSize = 10,
  searchTerm = "",
  searchCol = primaryKeyProperty,
  sortCol = primaryKeyProperty,
  sortDir = "asc",
  initialEditMode = false,
  initialData,
}: DatatableProps<Type>) {
  const [datatableParams, setDatatableParams] = useState<DatatableParams>({
    apiUrl: apiUrl,
    primaryKeyProperty: primaryKeyProperty,
    page: page,
    pageSize: pageSize,
    searchTerm: searchTerm,
    searchCol: searchCol,
    sortCol: sortCol,
    sortDir: sortDir,
  });
  const [editMode, setEditMode] = useState<boolean>(initialEditMode);

  const query = useQuery<PagedList<Type>>({
    queryKey: [datatableParams.apiUrl, datatableParams],
    queryFn: () => fetchData(datatableParams),
    placeholderData: keepPreviousData,
    initialData: initialData,
  });

  return { query, datatableParams, setDatatableParams, editMode, setEditMode };
}

const fetchData = async ({
  apiUrl,
  page,
  pageSize,
  searchTerm,
  searchCol,
  sortCol,
  sortDir,
}: DatatableParams) => {
  const res = await axios.get(apiUrl, {
    params: {
      page: page,
      pageSize: pageSize,
      sortDir: sortDir,
      sortCol: sortCol,
      searchTerm: searchTerm,
      searchCol: searchCol,
    },
  });
  return res.data;
};
