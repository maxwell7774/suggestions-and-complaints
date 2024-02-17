import PagedList from "@/lib/paged-list";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Session } from "next-auth/types";
import { useState } from "react";
import { Datatable, SearchFilter } from "..";
import axios from "axios";

interface DatatableProps<Type> {
  apiUrl: string;
  primaryKeyField: string;
  zodSchema: Zod.AnyZodObject;
  initialPage?: number;
  initialPageSize?: number;
  initialSortBy?: string;
  initialSortDir?: "asc" | "desc";
  initialSearchTerm?: string;
  initialSearchFields?: string[];
  initialEditMode?: boolean;
  initialData?: PagedList<Type>;
  initialSearchFilters?: SearchFilter[];
}

//Use query hook to get the data based on the api url
export function useDatatable<Type>({
  apiUrl,
  primaryKeyField,
  zodSchema,
  initialEditMode,
  initialSearchTerm,
  initialSearchFields,
  initialData,
  initialSearchFilters,
  initialPage,
  initialPageSize,
  initialSortBy,
  initialSortDir,
}: DatatableProps<Type>) {
  const [page, setPage] = useState<number>(initialPage ?? 1);
  const [pageSize, setPageSize] = useState<number>(initialPageSize ?? 10);
  const [sortBy, setSortBy] = useState<string>(
    initialSortBy ?? primaryKeyField
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">(
    initialSortDir ?? "asc"
  );
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm ?? "");
  const [searchFields, setSearchFields] = useState<string[]>(
    initialSearchFields ?? []
  );
  const [editMode, setEditMode] = useState<boolean>(initialEditMode ?? false);
  const [searchFilters, setSearchFilters] = useState<SearchFilter[]>(
    initialSearchFilters ?? []
  );

  const { status, data: session } = useSession();

  const query = useQuery<PagedList<Type>>({
    queryKey: [
      apiUrl,
      { page: page },
      { pageSize: pageSize },
      { sortBy: sortBy },
      { sortDir: sortDir },
      { searchTerm: searchTerm },
      { searchFields: searchFields },
      { searchFilters: searchFilters },
    ],
    queryFn: () =>
      fetchData(
        apiUrl,
        session,
        page,
        pageSize,
        sortBy,
        sortDir,
        searchTerm,
        searchFields,
        searchFilters
      ),
    placeholderData: keepPreviousData,
    initialData: initialData,
  });

  const addSearchFilter = (newSearchFilter: SearchFilter) => {
    setSearchFilters([...searchFilters, newSearchFilter]);
  };

  const removeSearchFilter = (searchFieldToRemove: SearchFilter) => {
    setSearchFilters(
      searchFilters.filter(
        (searchFilter) =>
          JSON.stringify(searchFieldToRemove) !== JSON.stringify(searchFilter)
      )
    );
  };
  const removeSearchFiltersByField = (field: string) => {
    setSearchFilters(
      searchFilters.filter((searchFilter) => searchFilter.field !== field)
    );
  };
  const removeSearchFiltersByFieldAndOperator = (
    field: string,
    operator: string
  ) => {
    setSearchFilters(
      searchFilters.filter(
        (searchFilter) =>
          searchFilter.field !== field && searchFilter.operator !== operator
      )
    );
  };

  const isSearchFilterSet = (searchFilter: SearchFilter): boolean => {
    let isSet = false;
    searchFilters.forEach((setFilter) => {
      if (JSON.stringify(searchFilter) === JSON.stringify(setFilter)) {
        isSet = true;
      }
    });
    return isSet;
  };

  const isSearchFilterWithFieldSet = (field: string): boolean => {
    let isSet = false;
    searchFilters.forEach((setFilter) => {
      if (setFilter.field === field) {
        isSet = true;
      }
    });
    return isSet;
  };

  const isSearchFilterWithFieldAndOperatorSet = (
    field: string,
    operator: string
  ): boolean => {
    let isSet = false;
    searchFilters.forEach((setFilter) => {
      if (setFilter.field === field && setFilter.operator === operator) {
        isSet = true;
      }
    });
    return isSet;
  };

  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    setPage(page - 1);
  };

  const firstPage = () => {
    setPage(1);
  };

  const lastPage = () => {
    if (query.data) {
      const pageCount = Math.ceil(query.data.totalCount / pageSize);
      setPage(pageCount);
    }
  };

  const addSearchField = (newSearchField: string) => {
    setSearchFields([...searchFields, newSearchField]);
  };

  const removeSearchField = (searchFieldToRemove: string) => {
    setSearchFields(
      searchFields.filter((searchField) => searchField !== searchFieldToRemove)
    );
  };

  const isSearchFieldSet = (searchField: string): boolean => {
    return searchFields.includes(searchField);
  };

  const clearSearchFields = () => {
    setSearchFields([]);
  };

  const datatable: Datatable = {
    apiUrl: apiUrl,
    primaryKeyField: primaryKeyField,
    zodSchema: zodSchema,
    page: page,
    setPage: setPage,
    pageSize: pageSize,
    setPageSize: setPageSize,
    searchTerm: searchTerm,
    sortBy: sortBy,
    setSortBy: setSortBy,
    sortDir: sortDir,
    searchFilters: searchFilters,
    setSearchFilters: setSearchFilters,
    setSortDir: setSortDir,
    setSearchTerm: setSearchTerm,
    addSearchField: addSearchField,
    removeSearchField: removeSearchField,
    removeSearchFiltersByField: removeSearchFiltersByField,
    removeSearchFiltersByFieldAndOperator:
      removeSearchFiltersByFieldAndOperator,
    isSearchFilterSet: isSearchFilterSet,
    isSearchFilterWithFieldSet: isSearchFilterWithFieldSet,
    isSearchFilterWithFieldAndOperatorSet:
      isSearchFilterWithFieldAndOperatorSet,
    isSearchFieldSet: isSearchFieldSet,
    clearSearchFields: clearSearchFields,
    addSearchFilter: addSearchFilter,
    removeSearchFilter: removeSearchFilter,
    nextPage: nextPage,
    previousPage: previousPage,
    firstPage: firstPage,
    lastPage: lastPage,
    editMode: editMode,
    setEditMode: setEditMode,
  };

  return {
    query,
    datatable,
  };
}

const fetchData = async (
  apiUrl: string,
  session: Session | null,
  page: number,
  pageSize: number,
  sortBy: string,
  sortDir: "asc" | "desc",
  searchTerm: string,
  searchFields: string[],
  searchFilters: SearchFilter[]
) => {
  const res = await axios.get(`${apiUrl}`, {params: {
    page: page,
    pageSize: pageSize,
    sortBy: sortBy,
    sortDir: sortDir,
    searchTerm: searchTerm,
    searchFields: searchFields ? JSON.stringify(searchFields) : null,
    searchFilters: searchFilters ? JSON.stringify(searchFilters) : null,
  }});
  const data = await res.data;
  return data;
};
